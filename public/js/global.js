$(document).ready(function () {
    displayUsersList();
    $('#addUserBtn').on('click', addUser);
    $('#usersList').on('click', 'a.deleteuser', deleteUser);
    $('#usersList').on('click', 'a.edituser', editUser);
    $('#usersList').on('click', 'a.saveuser', updateUser);
});

function displayUsersList() {
    var userListContent = '';
    $.getJSON('/api/getusers', function (data) {

        $.each(data, function () {
            userListContent += '<div id="' + this._id + '">';
            userListContent += '<span class="fname">' + this.firstname + '</span>' + ' ' + '<span class="lname">' + this.lastname + '</span>';
            userListContent += ' <a href="#" class="edituser" rel="' + this._id + '">Edit</a> | ';
            userListContent += ' <a href="#" class="deleteuser" rel="' + this._id + '">delete</a>';
            userListContent += '</div>';
        });

        $('#usersList').html(userListContent);
    });
}

function addUser(event) {
    event.preventDefault();
    var newUser = {
        'salutation': $('#addUser input#salutation').val(),
        'firstname': $('#addUser input#firstname').val(),
        'lastname': $('#addUser input#lastname').val()
    }

    $.ajax({
        type: 'POST',
        data: newUser,
        url: '/api/adduser',
        dataType: 'JSON'
    }).done(function (response) {
        if (response.msg === '') {
            $('#addUser input').val('');
            displayUsersList();
        }
        else {
            alert('Error: ' + response.msg);
        }
    });
};

// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/api/deleteuser/' + $(this).attr('rel')
        }).done(function (response) {
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
            displayUsersList();

        });

    }
    else {
        return false;
    }
};

// Edit User
function editUser(event) {

    event.preventDefault();

    var rowID = $(this).attr('rel');
    var fname = $('#' + rowID).find('.fname').text();
    var lname = $('#' + rowID).find('.lname').text();
    
    $('#' + rowID).hide();

    var userDataFeilds = '';

    userDataFeilds += '<div id="' + rowID + '">';
    userDataFeilds += '<input type="text" placeholder="First Name" id="firstname" value="' + fname + '" />';
    userDataFeilds += '<input type="text" placeholder="Last Name" id="lastname" value="' + lname + '" />';
    userDataFeilds += ' <a href="#" class="saveuser" rel="' + rowID + '">Save</a> | ';
    userDataFeilds += ' <a href="#" class="deleteuser" rel="' + rowID + '">delete</a>';
    userDataFeilds += '</div>';


    $('#usersList').find('#' + rowID).before(userDataFeilds);

};

// Update User
function updateUser(event) {

    event.preventDefault();

    var rowID = $(this).attr('rel');

    var modifiedData = {
        'firstname': $('#' + rowID).find('#firstname').val(),
        'lastname': $('#' + rowID).find('#lastname').val()
    }

    $('#' + rowID).remove();

    console.log(modifiedData);

    $.ajax({
        type: 'PUT',
        data: modifiedData,
        url: '/api/updateuser/' + rowID,
        dataType: 'JSON'
    }).done(function (response) {

    });
    displayUsersList();
};
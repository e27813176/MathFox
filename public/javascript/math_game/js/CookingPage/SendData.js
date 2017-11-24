const SendStageState = () => {
	if (globalUser.email.length() == 0 && globalUser.nickname.length() == 0) {
		//no login
	} else {
		$.ajax({
			type: 'POST',
			url: '/api/v1/user/updateUserRoleAndOrBirthdate',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify({ 'role': clicked_user_role }),
			success: function (data) {
				if (data['role'] === 'teacher') {
					window.location = '/?role=teacher';
				} else if (data['role'] === 'student') {
					Homepage.show(logged_in, 'student');
				}
			},
			error: function () {
				if (clicked_user_role === 'teacher') {
					Homepage.show(logged_in, 'teacher');
				} else if (clicked_user_role === 'student') {
					Homepage.show(logged_in, 'student');
				}
			}
		});
	}
}


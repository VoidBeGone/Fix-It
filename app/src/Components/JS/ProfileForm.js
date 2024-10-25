import { useState } from 'react';
import "../style/ProfileForm.css";

export default function ProfileForm() {
  const [person, setPerson] = useState({
    firstName: 'Joe',
    lastName: 'Doe',
    age: '25',
    email: 'JoeDoeh@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleAgeChange(e) {
    setPerson({
        ...person,
        age: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <div className="ProfileContainer">
        <div className="ProfileBox">
            <h2>Profile Info</h2>
            <div className="ProfileInput">
                First name:
                <input
                value={person.firstName}
                onChange={handleFirstNameChange}
                />
            </div>
            <div className="ProfileInput">
                Last name:
                <input
                value={person.lastName}
                onChange={handleLastNameChange}
                />
            </div>
            <div className="ProfileInput">
                Age:
                <input
                value={person.age}
                onChange={handleAgeChange}
                />
            </div>
            <div className="ProfileInput">
                Email:
                <input
                value={person.email}
                onChange={handleEmailChange}
                />
            </div>
            <button class="ProfileBtn">Change Info</button>
        </div>
    </div>
  );
}

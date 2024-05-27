'use client'

import { useRouter } from "next/navigation";
import { useState } from 'react'
import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css'
import bcrypt  from "bcryptjs"


const UpdateUserForm = ({id, username, email, phone, isAdmin, isActive, address}) => {

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [newUsername, setNewUsername] = useState(username);
    const [newEmail, setNewEmail] = useState(email);
    const [newPassword, setNewPassword] = useState('');
    const [newPhone, setNewPhone] = useState(phone);
    const [newIsAdmin, setNewIsAdmin] = useState(isAdmin);
    const [newIsActive, setNewIsActive] = useState(isActive);
    const [newAddress, setNewAddress] = useState(address);

    const [error, setError] = useState(null);
    const router = useRouter();

    const updateUser = async (e) => {
      e.preventDefault();
      setError(null); // Clear previous errors on submit
      try {
          let updatedUser = { newUsername, newEmail, newPhone, newIsAdmin, newIsActive, newAddress };

          if (newPassword) {
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(newPassword, salt);
              updatedUser.newPassword = hashedPassword;
          }

          const url = `${baseUrl}/api/users/${id}`;
          const res = await fetch(url, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedUser),
          });

          if (!res.ok) {
              const errorData = await res.json(); // Parse error JSON (if available)
              setError(errorData?.message || 'Failed to update user'); // User-friendly message
              return; // Handle error gracefully (display error)
          }

          router.refresh(); // Optional refresh (consider redirecting instead)
          router.push('/dashboard/users?page=1'); // Redirect to homepage
      } catch (error) {
          console.error('Error updating user:', error);
          setError('An unexpected error occurred'); // Generic error message
      }
  };

    return(
        <>
      <form onSubmit={updateUser} className={styles.form}>
        <label>Username</label>
        <input onChange={(e) => setNewUsername(e.target.value)} value={newUsername} type="text" placeholder="Enter Username" />

        <label>Email</label>
        <input onChange={(e) => setNewEmail(e.target.value)} value={newEmail} type="email" name="email" placeholder="Enter Email" />

        <label>Password</label>
        <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="password" name="password" placeholder="Enter New Password" />

        <label>Phone</label>
        <input onChange={(e) => setNewPhone(e.target.value)} value={newPhone} type="text" name="phone" placeholder="Enter Phone" />

        <label>Address</label>
        <textarea onChange={(e) => setNewAddress(e.target.value)} value={newAddress} name="address" placeholder="Enter Address" />

        <label>Is Admin?</label>
        <select onChange={(e) => setNewIsAdmin(e.target.value === 'true')} value={newIsAdmin} name="isAdmin" id="isAdmin">
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <label>Is Active?</label>
        <select onChange={(e) => setNewIsActive(e.target.value === 'true')} value={newIsActive} name="isActive" id="isActive">
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        {error && <p>{error}</p>}
        <button>Update User?</button>
      </form>
        </>
    )
}

export default UpdateUserForm
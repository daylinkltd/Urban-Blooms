"use client";

import styles from '@/app/ui/dashboard/users/addUser/addUser.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import convertGoogleDriveLink from '@/app/lib/GoogleDriveLinkConverter';

const AddUserPage = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [isActive, setIsActive] = useState('');
    const [address, setAddress] = useState('');
    const [img, setImg] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !isAdmin || !isActive) {
            alert('Please check if you have filled the required fields');
            return;
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const res = await fetch(`${baseUrl}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password: hashedPassword, phone, isAdmin, isActive, address, img }),
            });
            if (res.ok) {
                router.refresh();
                router.push('/dashboard/users?page=1');
            } else {
                throw new Error('Failed to Create User');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username" required />
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
                <select onChange={(e) => setIsActive(e.target.value)} value={isActive} id="isActive">
                    <option>Is Active?</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <input onChange={(e) => setPhone(e.target.value)} value={phone} type="phone" name="phone" placeholder="Phone" />
                <select onChange={(e) => setIsAdmin(e.target.value)} value={isAdmin} name="isAdmin" id="isAdmin">
                    <option>Is Admin?</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <textarea onChange={(e) => setAddress(e.target.value)} value={address} name="address" id="address" rows="4" placeholder="Address"></textarea>
                {/* <input onChange={(e) => setImg(e.target.value)} value={img} type="file"/> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddUserPage;

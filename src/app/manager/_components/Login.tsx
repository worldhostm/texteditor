'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Login() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          router.replace('/home'); // ✅ 토큰 있으면 홈으로 이동
        }
      }, []);
    

    const handleLogin = async () => {
        try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: id, password }),
        })

        const data = await res.json();
        if (res.ok) {
            alert('✅ 로그인 성공')
            console.log(data) // 예: 토큰 or 사용자 정보
            router.push('/editor');
            localStorage.setItem('token', JSON.stringify(data));
        } else {
            alert(`❌ 로그인 실패: ${data.message}`)
        }
        } catch (err) {
        console.error('에러 발생:', err)
        alert('서버와의 통신 오류')
        }
    }
  return (
    <div 
    className='login'
    style={{
        width:'100%',
        minHeight : '50vh',
        display:'flex',
        flexDirection:'column',
        gap:'48px',
        justifyContent:'center',
        alignContent:'center'
    }}>
        <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  )
}

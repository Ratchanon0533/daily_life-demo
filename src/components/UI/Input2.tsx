// Input2.tsx
import styled from 'styled-components';

interface InputProps {
    text: string;
}

const Input2 = ({text}: InputProps) => {
    return (
        <StyledWrapper>
            <div className="group">
                {/* SVG Icon */}
                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" /></g></svg>
                <input placeholder={text} type="search" className="input" />
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    /* Wrapper ให้ขยายเต็มพื้นที่คอลัมน์ของ Bootstrap */
    width: 100%;

    .group {
        display: flex;
        line-height: 28px;
        align-items: center;
        position: relative;
        width: 100%; /* ทำให้ Group ขยายเต็ม 100% ของ StyledWrapper */
        /* ลบ max-width: 190px; ออก เพื่อให้ Input ขยายตามคอลัมน์ */
    }

    .input {
        width: 100%;
        height: 50px; /* เพิ่มความสูงเล็กน้อยเพื่อให้เข้ากับธีม */
        line-height: 28px;
        padding: 0 1rem;
        padding-left: 3rem; /* เพิ่ม padding ซ้ายเพื่อให้ icon มีพื้นที่ */
        border: 1px solid #ced4da; /* ใช้สีที่คล้าย Bootstrap default */
        border-radius: 0.75rem; /* ทำให้มุมโค้งมน */
        outline: none;
        background-color: #fff;
        color: #0d0c22;
        transition: .3s ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* เพิ่มเงาบางๆ */
    }

    .input::placeholder {
        color: #9e9ea7;
    }

    .input:focus, input:hover {
        outline: none;
        /* ใช้สี Primary ของ Bootstrap (#007bff) */
        border-color: rgba(0, 123, 255, 0.7); 
        background-color: #fff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .icon {
        position: absolute;
        left: 1rem;
        fill: #9e9ea7;
        width: 1.25rem; /* ขยาย icon เล็กน้อย */
        height: 1.25rem;
        z-index: 10; /* ให้ icon อยู่ด้านบนสุด */
    }
`;

export default Input2;
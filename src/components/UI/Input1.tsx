import styled from 'styled-components';

interface InputProps {
  text: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const Input1 = ({ text,onChange }: InputProps) => {
  return (
    <StyledWrapper>
      <input 
        type="text"
        autoComplete="off"
        className="input"
        placeholder={text}
        onChange={onChange}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    border: none;
    outline: none;
    border-radius: 15px;
    padding: 1em;
    background-color: #ccc;
    box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
    transition: 300ms ease-in-out;
    
  }

  .input:focus {
    background-color: black;
    transform: scale(1.05);
    box-shadow: 13px 13px 100px #969696,
               -13px -13px 100px #ffffff;
  }`;

export default Input1;

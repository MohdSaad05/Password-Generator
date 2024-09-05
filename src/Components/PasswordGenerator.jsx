import React, {useEffect, useState} from 'react'
import './PasswordGenerator.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList = '0123456789';
const symbolsList = '!@#$%^&*()?';
function PasswordGenerator(){

    const [password, setPassword] = useState('');
    const [lowerCase, setLowerCase] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [passwordLength, setPasswordLength] = useState(8);
    const [selectedChoices, setSelectedChoices] = useState(['lowercase','uppercase','numbers','symbols']);

    useEffect(()=>{
         generatePassword();
    },[passwordLength]);

    const handleCheckbox = (type) =>{
        let tempChoices = selectedChoices;
        if(tempChoices.includes(type)){
             const index= tempChoices.indexOf(type);
             tempChoices.splice(index,1);
        }else{
            tempChoices.push(type);
        }
        console.log(tempChoices);
        setSelectedChoices(tempChoices);
    }
    
    const generatePassword = () =>{
        let characterList = '';
        if(lowerCase){
            characterList += lowercaseList;
        } 
        if(upperCase){
            characterList += uppercaseList;
        }
        if(numbers){
            characterList += numbersList;
        }
        if(symbols){
            characterList += symbolsList;
        }
        
        let tempPassword = '';
        const characterListLength = characterList.length;
        for(let  i=0;i<passwordLength;i++){
             const characterIndex = Math.floor(Math.random()* characterListLength);
             tempPassword += characterList.charAt(characterIndex);
        }
        setPassword(tempPassword);
    }

    const copyPassword = async()=>{
        const copiedText = await navigator.clipboard.readText();
        if(password.length && copiedText !== password){
            navigator.clipboard.writeText(password);
            toast.success('Password copied to clipboared!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
        }
    }
     
    return (
        <>
        <div className='container'>
            <h2 className='title'>Strong Password Generator</h2>
            <div className="password-wrapper">
                <div className="password-area">
                    <div className="password">
                        <input type="text" value={password} disabled placeholder='Click on the Generate Password'/>
                    </div>
                </div>
            </div>
         <div className="setting">
            <h3>Customize your password</h3>
            <div className="customize">
                <div className="checkboxes">
                    <div className="left">
                        <div className="checkbox-filed">
                           <input type="checkbox" name="lower" id="lower" checked={lowerCase}  disabled={selectedChoices.length === 1 && selectedChoices.includes('lowercase')} onChange={()=>{ setLowerCase(!lowerCase); handleCheckbox('lowercase');}}/> 
                           <label htmlFor="lower">Include LowerCase(a-z)</label>
                        </div>
                        <div className="checkbox-filed">
                           <input type="checkbox" name="Upper" id="Upper" checked={upperCase} disabled={selectedChoices.length === 1 && selectedChoices.includes('uppercase')} onChange={()=> {setUpperCase(!upperCase); handleCheckbox('uppercase');}}/> 
                           <label htmlFor="Upper">Include UpperCase(A-Z)</label>
                        </div>
                    </div>
                    <div className="right">
                    <div className="checkbox-filed">
                           <input type="checkbox" name="numbers" id="numbers" checked={numbers} disabled={selectedChoices.length === 1 && selectedChoices.includes('numbers')} onChange={()=>{ setNumbers(!numbers); handleCheckbox('numbers');}}/> 
                           <label htmlFor="numbers">Include Numbers(0-9)</label>
                        </div>
                        <div className="checkbox-filed">
                           <input type="checkbox" name="Symbols" id="Symbols" checked={symbols} disabled={selectedChoices.length === 1 && selectedChoices.includes('symbols')} onChange={()=> {setSymbols(!symbols); handleCheckbox('symbols');}}/> 
                           <label htmlFor="Symbols">Include Symbols(&-#)</label>
                        </div>
                    </div>
                </div>
            </div>
         </div>
         <div className="password-length">
            <h3>Password Length</h3>
            <div className="slider">
                <p className="rangeValue">{passwordLength}</p>
                <div className="range">
                    <input type="range" min={8} max={40} defaultValue={passwordLength} onChange={(event) => setPasswordLength(Number(event.currentTarget.value))} />
                </div>
            </div>
         </div>
         <div className="buttons">
            <button type='button' onClick={copyPassword} >Copy Password</button>
            <button type='button' onClick={generatePassword}>Generate Password</button>
         </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default PasswordGenerator;
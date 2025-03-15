import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasSymbols, setHasSymbols] = useState(false);

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let generatedPassword = '';

    let passwordCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(hasNumbers) passwordCharacters += '0123456789';
    if(hasSymbols) passwordCharacters += '!@#$%^&*()_+';

    for(let i = 0; i < length; i++) {
      generatedPassword += passwordCharacters.charAt(Math.floor(Math.random() * passwordCharacters.length));
    }

    setPassword(generatedPassword);

  }, [length,hasNumbers,hasSymbols, setPassword ]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 41);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, hasNumbers, hasSymbols, passwordGenerator])

  return (
    <>
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 ">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white text-gray-800"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={40}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={hasNumbers}
          id="numberInput"
          onChange={() => {
              setHasNumbers((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={hasSymbols}
              id="characterInput"
              onChange={() => {
                  setHasSymbols((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    </>
  )
}

export default App

import { useNavigate } from "react-router";
import "./form.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const OTP = () => {

    const navigate = useNavigate()

    const [otp, setOtp] = useState('')

    const {handleOtp} = useAuth()    

    async function handleSubmit(e){
        e.preventDefault()
        const success = await handleOtp(otp)
        if(success){
            navigate('/')
        }
        
    }

  return (
    <main>
      <div className="container">
        <h1>Verify OTP</h1>

        <p className="otp-description">
          Enter the 6-digit OTP sent to your email address.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="otp">One-Time Password</label>

            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => {
                const value = e.target.value;

                if (/^\d{0,6}$/.test(value)) {
                  setOtp(value);
                }
              }}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
            />
          </div>

          <button type="submit" className="button primary-button">
            Verify OTP
          </button>
              <p onClick={() => {
                navigate('/register')
              }}>Back</p>
        </form>
      </div>
    </main>
  );
};

export default OTP;

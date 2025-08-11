import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerificationPage() {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").trim();
        if (/^\d+$/.test(pasteData)) {
            const digits = pasteData.slice(0, 6).split("");
            setOtp(digits.concat(new Array(6 - digits.length).fill("")));
            digits.forEach((digit, i) => {
                inputsRef.current[i].value = digit;
            });
        }
        e.preventDefault();
    };

    const handleVerify = async () => {
        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            toast.error("Please enter complete OTP");
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/verify`,
                { email, otp: otpValue }
            );
            toast.success(res.data.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Verification failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-2">
            <div className='p-6 bg-white rounded-xl shadow-md mt-10'>
                <h2>Enter OTP</h2>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        margin: "20px 0",
                    }}
                    onPaste={handlePaste}
                >
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el)}
                            style={{
                                width: "50px",
                                height: "50px",
                                fontSize: "20px",
                                textAlign: "center",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                            disabled={isLoading}
                        />
                    ))}
                </div>
                <button
                    onClick={handleVerify}
                    disabled={isLoading}
                    className={`w-full py-2 px-4 text-white rounded-md transition duration-200 ${isLoading
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        }`}
                >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
            </div>
        </div>
    )
}
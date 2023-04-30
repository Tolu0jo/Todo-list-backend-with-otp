export const generateOtp=()=>{
    const otp = Math.floor(1000 + Math.random()* 9000)
    const expiry = new Date()
    expiry.setTime(expiry.getTime() + (30 * 60 * 1000))

    return {otp,expiry}
}

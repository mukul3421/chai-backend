const asyncHandler = (requestHandler)=>{
    (res,req,next) => {
        Promise.resolve(requestHandler(res,req,next)).
        catch((err) => next(err))
    }
}
    
export { asyncHandler }
    
// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {} // aghe ek or func mai pass krdia
// const asyncHandler = (func) => async () => {} // aghe ek or func mai pass krdia or async bana dia

// A WRAPPER FUNCTION FOR DATABASE CODE SO WE DONT WIRTE IT AGAIN ND AGAIN THROUGH TRY CATCH
// const asyncHandler = (fn) => async (res,req,next) => {
//     try {
//         await fn(res,req,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message: err.message
//         })
//     }
// }
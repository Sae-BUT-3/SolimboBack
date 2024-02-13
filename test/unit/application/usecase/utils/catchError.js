module.exports = async (action) => {
    try{
        await action()
    }catch (error){
        return error
    }
    return null
}
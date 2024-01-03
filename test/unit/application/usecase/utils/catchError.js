module.exports = async (action) => {
    try{
        await action()
    }catch (error){
        return error
    }
    console.log("dfezfezfzefez")
    return null
}
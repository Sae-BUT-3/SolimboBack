module.exports = (field,message) =>{
    const err = new Error(message)
    err.field = field
    return err
}
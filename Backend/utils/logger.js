const logger=(action,user)=>{

    console.log(`${new Date()} | ${user} | ${action}`);

}

export default logger;
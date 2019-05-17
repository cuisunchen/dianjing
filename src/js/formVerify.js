class FormVerify{
    constructor(item){
        this.item = item;
    }

    check_userId(){
        if( this.item.model ){
            if( this.item.model.length < this.item.minlength ){
                this.item.checked = false
                this.item.rightIcon.haveIcon = true;  
                this.item.rightIcon.msg = '最低6位数';              
                this.item.rightIcon.iconUrl =  require("../assets/img/ico_err.png");
            }else{
                this.item.checked = true
                this.item.rightIcon.haveIcon = true;
                this.item.rightIcon.msg = '';
                this.item.rightIcon.iconUrl =  require("../assets/img/ico_right.png");
            }
        }else{
            this.item.checked = false
            this.item.rightIcon.haveIcon = false;
            this.item.rightIcon.msg = '';
        }         
        return this.item
    }
    check_pwd(verifyPwd){
        if( this.item.model ){
            if( this.item.model.length < this.item.minlength){
                this.item.checked = false
                this.item.rightIcon.haveIcon = true;
                this.item.rightIcon.iconUrl =  require("../assets/img/ico_err.png");
                this.item.rightIcon.msg = '最低6位数';
            }else{
                this.item.checked = true
                this.item.rightIcon.haveIcon = true;
                this.item.rightIcon.msg = '';
                this.item.rightIcon.iconUrl =  require("../assets/img/ico_right.png");
            }
        }
        if( this.item.model && verifyPwd.model ){
            if(  this.item.model == verifyPwd.model ){
                verifyPwd.checked = true
                verifyPwd.rightIcon.msg = '';
                verifyPwd.rightIcon.iconUrl =  require("../assets/img/ico_right.png");
            }else{
                verifyPwd.checked = false
                verifyPwd.rightIcon.msg = '密码不一致';
                verifyPwd.rightIcon.iconUrl =  require("../assets/img/ico_err.png");
            }
        }
        return this.item
    }
    check_verifyPwd(pwd){
        if( this.item.model ){
            if( this.item.model.length < this.item.minlength){ 
                this.item.checked = false
                this.item.rightIcon.haveIcon = true;
                this.item.rightIcon.iconUrl =  require("../assets/img/ico_err.png");
                this.item.rightIcon.msg = '密码不合法';
            }else if( this.item.model.length >= this.item.minlength && this.item.model != pwd.model){
                this.item.checked = false
                this.item.rightIcon.haveIcon = true;
                this.item.rightIcon.msg = '密码不一致';
                this.item.rightIcon.iconUrl =  require("../assets/img/ico_err.png");
            }else{
                this.item.checked = true
                this.item.rightIcon.haveIcon = true;
                this.item.rightIcon.msg = '';
                this.item.rightIcon.iconUrl =  require("../assets/img/ico_right.png");
            }
        }else{
            this.item.checked = false
            this.item.rightIcon.haveIcon = false;
            this.item.rightIcon.msg = '';
        }
        
        return this.item
    }
    check_phoneEmail(){
        this._checkInputLength()
        return this.item
    }
    check_code(){
        this._checkInputLength()
        return this.item
    }
    check_inviteCode(){
        this._checkInputLength()
        return this.item
    }
    check_QQ(){
        this._checkInputLength()
        return this.item
    }

    _checkInputLength(){
        if( this.item.model ){
            if( this.item.model.length < this.item.minlength ){
                this.item.checked = false
                this.item.rightIcon.haveIcon = true;                
                this.item.rightIcon.iconUrl =  require("../assets/img/ico_err.png");
            }else{
                this.item.checked = true
                this.item.rightIcon.haveIcon = true;
                this.item.rightIcon.iconUrl =  require("../assets/img/ico_right.png");
            }
        }else{
            this.item.checked = false
            this.item.rightIcon.haveIcon = false;
            this.item.rightIcon.msg = '';
        }        
    }
}
export default FormVerify
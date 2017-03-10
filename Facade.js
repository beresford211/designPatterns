var RegisterUser = function(name, username, password) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.isVip = null;
}

RegisterUser.prototype.addVipStatus = function(status){
  if(this.isVip){
    return true;
  } else {
    if(status === "buy"){
      this.isVip = true;
    }
  }
}

RegisterUser.prototype.isValid = function(username, password) {

    var result = "authenticated";
    if (!new Email().verify(this.username, username)) {
      result = "invalid credentials check email and password";
    } else if (!new Password().check(this.password, password)) {
      result = "invalid credentials";
    } else if (!new VipStatus().check(this.isVip)) {
      result = "$$welcome back you should buy vip status$$";
    }
    return result;
};

var Email = function() {
    this.verify = function(uname, inputUName) {
        if(uname === inputUName){
          return true;
        } else {
          return false;
        }
    };
};

var Password = function(password) {
    this.check = function(currentPassword, passwordInputed) {
        if(currentPassword === passwordInputed){
          return true;
        } else {
          return false;
        }
    };
};

var VipStatus = function() {
    this.check = function(vipStatus) {
        if(!vipStatus){
          return false;
        } else {
          return true;
        }
    };
};

function run() {
    var login = new RegisterUser("Joan Templeton", "user@happy.com","imhappy");
    var result = login.isValid("user@happy.com","happy");
    alert(result);
}
run();

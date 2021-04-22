'use strict';
app.factory('appRoles',function (APP_CONFIG) {

    var roles=[];
    var rolLogueadoNombre = "";
    var sysAdminRoles=[1000];
    var vendedorRoles = [1000, 2000];
    var distriRoles = [1000,2000,3000];
    var auxiliarDeposito = [4000];
    var administracionRoles = [5000];

    var mIsSysAdmin=false;
    var mIsVendedor=false;
    var mIsDistribuidor=false;
    var mIAuxiliar=false;
    var mIAdministracion=false;

    //var mIsEstudio=false;

    return {
        getRolDescri: function(){
            return rolLogueadoNombre;
        },
        isSysAdmin: function (only) {
            if (only){
                return (_.indexOf(roles,1000))>-1;
            }else{
                return mIsSysAdmin;
            }
        },
        isVendedor: function (only) {
            if (only){
                return (_.indexOf(roles,2000))>-1;
            }else{
                return mIsVendedor;
            }
        },
        isDistribuidor: function (only) {
            if (only){
                return (_.indexOf(roles,3000))>-1;
            }else{
                return mIsDistribuidor;
            }
        },
        isAuxDepo: function (only) {
            if (only){
                return (_.indexOf(roles,4000))>-1;
            }else{
                return mIAuxiliar;
            }
        },
        isAdministracion: function (only) {
            if (only){
                return (_.indexOf(roles,5000))>-1;
            }else{
                return mIAdministracion;
            }
        },
        setRoles: function (usrRoles) {
            roles=_.pluck(usrRoles, 'Valor');
            rolLogueadoNombre = usrRoles[0].Nombre;
            mIsSysAdmin = _.intersection(sysAdminRoles,roles).length>0;
            mIsVendedor = _.intersection(vendedorRoles,roles).length>0;
            mIsDistribuidor = _.intersection(distriRoles,roles).length>0;
            mIAuxiliar = _.intersection(auxiliarDeposito,roles).length>0;
            mIAdministracion = _.intersection(administracionRoles,roles).length>0;
        },
        clearRoles: function () {
            mIsVendedor = false;
            mIsSysAdmin= false;
            mIsDistribuidor= false;
            mIAuxiliar=false;
            mIAdministracion=false;
        },
        isEnabled:function (rol) {
            return (_.min(roles)<=rol);
        }
    };
});

app.factory('appFuncionalidades', ['appDominio', function (appDominio) {
    return {
        hasAutoGestion:function () {
            if(appDominio.currentDominio.Planes != null && appDominio.currentDominio.Planes.length > 0){
                var func = _.filter(appDominio.currentDominio.Planes, function(obj){ return obj.Codigo ==2; });
                return func.length > 0;
            }else{
                return false;
            }
        }
    };
}]);

app.factory('appSession', function () {
    return {
        currentUser: null
    };
});

app.factory('appDominio', function () {
    return {
        currentDominio: null
    };
});

app.factory('Autenticacion',['appSession','appRoles', 'appDominio', '$cookies', 'ServiciosGlobales', 'APP_CONFIG', '$state', 'Mensaje',
    function (appSession,appRoles, appDominio, $cookies, Srv, APP_CONFIG, $state, Mensaje) {

    return {
        login: function (user) {
            if(user.Empleo == null){
                user.Empleo = {};
                user.Empleo.Persona = {};
                user.Empleo.Persona.Foto = "img/user.png";
            }else if(user.Empleo.Persona.Foto ==''){
                user.Empleo.Persona.Foto = "img/user.png";
            }
            appSession.currentUser = user;
        },
        setEmployId: function(employid){
            appSession.currentUser.EmployID = employid;
        },
        logout: function () {
            appSession.currentUser = null;
            appRoles.clearRoles();
        },
        isLoggedIn: function (e, toState) {

            Srv.getUsuarioLogueado().then(function (res) {
                    var user = res.data;

                    if(user!=null){

                        if(user.Empleo == null){
                            user.Empleo = {};
                            user.Empleo.Persona = {};
                            user.Empleo.Persona.Foto = "img/user.png";
                        }else if(user.Empleo.Persona.Foto ==''){
                            user.Empleo.Persona.Foto = "img/user.png";
                        }
                        appSession.currentUser = user;
                        appRoles.setRoles(user.Roles);

                        //Usuario vivo en session .net
                        if (toState.name === "login") {
                            $state.go("index.main");
                        }
                    }else{

                        if( toState.name == "recuperar") {
                            return;
                        }
                        if( toState.name == "registro") {
                            return;
                        }
                        if( toState.name != "login") {
                            Mensaje.error('No esta logueado.', 'Atención');
                            e.preventDefault();
                            $state.go('login');
                        }else{
                            if (toState.data.auth<APP_CONFIG.ct_baseRoleAuth){
                                e.preventDefault();
                                $state.go('index.main');

                            }
                        }
                    }
                }
            );
        },
        setDominio: function (dominio) {
            appDominio.currentDominio = dominio;
        }
    };
}]);

app.factory('Mensaje', function Mensaje() {
    return {
        success: function (msg, title) {
            $.Notification.notify('success', 'top right', title, msg);
            //toaster.pop('success', title, msg);
        },
        error: function (msg, title) {
            $.Notification.notify('error', 'top right', title, msg);
            //toaster.pop('error', title, msg);
        },
        info: function (msg, title) {
            $.Notification.notify('info', 'top right', title, msg);
            //toaster.pop('info', title, msg);
        },
        warning: function (msg, title) {
            $.Notification.notify('warning', 'top right', title, msg);
            //toaster.pop('warning', title, msg);
        }
    };
});

app.factory('appUtils',function(){
        var mToday=null;
        return{
            checkDateInput: function () {
                var input = document.createElement('input');
                input.setAttribute('type','date');

                var notADateValue = 'not-a-date';
                input.setAttribute('value', notADateValue);

                return !(input.value === notADateValue);
            },
            setToday: function(hoy){
                mToday=hoy;
            },
            today: function(){
                return mToday;
            }


        }}
);


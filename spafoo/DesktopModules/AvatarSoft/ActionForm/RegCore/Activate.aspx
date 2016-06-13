<%@ Page Language="C#" AutoEventWireup="true" Inherits="avt.ActionForm.RegCore.Activate" CodeBehind="Activate.aspx.cs" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" data-ng-app="Activate" class="bstrap30 bstrap3-material">
<head runat="server">
    <title>Activate <%= avt.ActionForm.Core.App.Info.Name %></title>
    <link type="text/css" rel="stylesheet" href=<%= "\"" + avt.ActionForm.Core.App.BaseUrl%>/static/bootstrap-material/css/bootstrap.min.css?v=<%= avt.ActionForm.Core.App.Info.Build + "\"" %> />
    <script type="text/javascript" src="<%=avt.ActionForm.Core.App.BaseUrl %>/static/jquery.min.js?<%= avt.ActionForm.Core.App.Info.Build %>"></script>
    <script type="text/javascript" src="<%=avt.ActionForm.Core.App.BaseUrl %>/static/angular/angular.min.js?<%= avt.ActionForm.Core.App.Info.Build %>"></script>
    <script type="text/javascript" src="<%=avt.ActionForm.Core.App.BaseUrl %>/static/bootstrap-material/js/bootstrap.min.js?<%= avt.ActionForm.Core.App.Info.Build %>"></script>

    <script>
        var $ = dnnsfjQuery;
    </script>
    <style>
        .form-group .text-muted {
            margin: 4px;
        }
    </style>
</head>
<body class="bstrap30">
    <form class="form-horizontal" role="form" runat="server">
        <div class="container" data-ng-controller="ActivateCtl">

            <h2 style="margin: 40px 0;">Activate <%= avt.ActionForm.Core.App.Info.Name %></h2>


            <div data-ng-show="!isAdmin">
                <p>You must be logged in as an admin to activate <%= avt.ActionForm.Core.App.Info.Name %></p>
                <a href="<%= avt.ActionForm.Core.App.RootUrl %>/Default.aspx?ctl=login&returnurl=<%= HttpUtility.UrlEncode(Request.RawUrl) %>">Login here</a>
            </div>

            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true" data-ng-show="isAdmin">
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingOne">
                        <h4 class="panel-title" style="font-size: 20px;">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Already have purchased a license? Activate this copy below.
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne"
                        data-ng-class="{ 'in': hash != '#trial' }">
                        <div class="panel-body">

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Invoice Number <br />or License Key</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" data-ng-model="invoiceNo" />
                                    <p class="text-muted">
                                        <span class="glyphicon glyphicon-question-sign"></span>
                                        This is the invoice number provided by DNN Store or DNN Sharp team.</p>
                                </div>
                            </div>

              <%--              <div class="form-group">
                                <label class="col-sm-3 control-label">Key File</label>
                                <div class="col-sm-8" data-ng-if="upoloadKeySupported">
                                    <input type="file" onchange="angular.element(this).scope().keyUploaded(event)" style="margin-top: 6px;" /><br />
                                    <textarea class="form-control" data-ng-model="key" readonly="readonly" rows="6"></textarea>
                                    <p class="text-muted">
                                        <span class="glyphicon glyphicon-question-sign"></span>
                                        Download the key file from DNN Store product downloads and upload it here.</p>
                                </div>
                                <div class="col-sm-8" data-ng-if="!upoloadKeySupported">
                                    <textarea class="form-control" data-ng-model="key"></textarea>
                                    <p class="text-muted">
                                        <span class="glyphicon glyphicon-question-sign"></span>
                                        Download the key file from DNN Store product downloads, open it in a text editor, and copy the contents here.</p>
                                </div>
                            </div>--%>

                            <div class="form-group" data-ng-show="licenseType.code == 'DOM' || licenseType.code == 'XDOM' || licenseType.code == '3DOM' || licenseType.code == '3XDOM' ||licenseType.code == 'SRV'">
                                <label class="col-sm-3 control-label">Domain</label>
                                <div class="col-sm-8">
                                    <select class="form-control" data-ng-model="host" data-ng-options="host for host in hosts">
                                    </select>
                                    <p class="text-muted">
                                        <span class="glyphicon glyphicon-question-sign"></span>
                                        The license will be bound to this host name.
                                    </p>
                                </div>
                            </div>

                            <div class="form-group" data-ng-show="!loading">
                                <div class="col-sm-8 col-sm-offset-3">
                                    <button type="button" class="btn btn-primary" data-ng-click="activate()">Activate</button>
                                </div>

                            </div>

                            <div class="col-sm-offset-3" data-ng-show="loading">
                                <img src="<%= avt.ActionForm.Core.App.Info.BaseUrl %>/static/loading.gif" />
                            </div>

                            <div class="col-sm-offset-3 alert alert-danger" data-ng-if="errInput">
                                Please fill in all fields above.
                            </div>

                            <div class="col-sm-offset-3 alert alert-danger" data-ng-if="response">
                                {{response}}
                            </div>

                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingTwo">
                        <h4 class="panel-title" style="font-size: 20px;">
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#trial" aria-expanded="false" aria-controls="trial">Don't have a license yet? Try it FREE for 30 days.
                            </a>
                        </h4>
                    </div>
                    <div id="trial" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo"
                        data-ng-class="{ 'in': hash == '#trial' }">
                        <div class="panel-body">

                            <div class="form-group">
                                <div class="col-sm-8 col-sm-offset-3">
                                    Unlock trial using your <a href="http://www.dnnsharp.com" target="_blank">dnnsharp.com</a> account
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Username</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" data-ng-model="username" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Password</label>
                                <div class="col-sm-8">
                                    <input type="password" class="form-control" data-ng-model="password" />
                                    <p class="text-muted">
                                        <span class="glyphicon glyphicon-question-sign"></span>
                                        Your username and password for dnnnsharp.com.</p>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label">Host</label>
                                <div class="col-sm-8">
                                    <select class="form-control" data-ng-model="host" data-ng-options="host for host in hosts">
                                    </select>
                                    <p class="text-muted">
                                        <span class="glyphicon glyphicon-question-sign"></span>
                                        This is the domain name to activate the trial for.</p>
                                </div>
                            </div>

                            <div class="form-group" data-ng-show="!loading">
                                <div class="col-sm-8 col-sm-offset-3">
                                    <button type="button" class="btn btn-primary" data-ng-click="unlockTrial()">Unlock Trial</button>
                                </div>
                                <div class="col-sm-8 col-sm-offset-3" style="margin-top: 8px;">
                                    <a href="https://www.dnnsharp.com/register" target="_blank">Don't have an account? Create one now, it's free.</a>
                                </div>
                            </div>

                            <div class="col-sm-offset-3" data-ng-show="loading">
                                <img src="<%= avt.ActionForm.Core.App.Info.BaseUrl %>/static/loading.gif" />
                            </div>

                            <div class="col-sm-offset-3 alert alert-danger" data-ng-if="errInput">
                                Please fill in all fields above.
                            </div>

                            <div class="col-sm-offset-3 alert alert-danger" data-ng-if="response">
                                {{response}}
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        </div>
    </form>

    <script>

        var app = angular.module('Activate', []);

        function ActivateCtl($scope, $http) {
            $scope.upoloadKeySupported = window.File && window.FileReader && window.FileList && window.Blob;
            $scope.host = window.currentAlias;
            $scope.hosts = window.hosts;
            $scope.isAdmin = window.isAdmin;
            $scope.hash = window.location.hash;
            $scope.licenseType = null;
            $scope.key = '<%= avt.ActionForm.Core.App.Info.Key %>';

            //$scope.keyUploaded = function (evt) {
            //    var reader = new FileReader();
            //    reader.onload = function (e) {
            //        var contents = e.target.result;
            //        $scope.key = contents;
            //        $scope.$apply();
            //    };
            //    reader.readAsText(evt.target.files[0])
            //};

            var fnRegcCoreRequest = function(url, data, fnDone) {
                $scope.errInput = false;
                $scope.loading = false;
                $scope.response = '';

                $scope.loading = true;

                $http({
                    method: 'POST',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: $.param(data)
                }).success(function (data, status) {

                    if (data.error) {
                        $scope.loading = false;
                        $scope.response = data.error;
                        return;
                    }

                    fnDone && fnDone(data);
                });
            }

            var fnSaveKey = function (data, fnDone) {
                // submit license keys to this server
                $http({
                    method: 'POST',
                    url: '<%= SaveActivationUrl %>',
                    data: data
                }).success(function (data, status) {
                    if (data.error) {
                        $scope.loading = false;
                        $scope.response = data.error;
                        return;
                    }

                    fnDone && fnDone(data);
                });
            };

            var fnActivate = function () {
                fnRegcCoreRequest('<%= ActivationUrl %>', {
                    productCode: '<%= avt.ActionForm.Core.App.Info.Code %>',
                    versionCode: '<%= avt.ActionForm.Core.App.Info.Build %>',
                    licenseKey: $scope.invoiceNo,
                    publicKey: $scope.key,
                    host: $scope.host,
                    machine: '<%= Environment.MachineName %>',
                    hostid: '<%= DotNetNuke.Entities.Host.Host.GUID %>'
                }, function (data) {
                    fnSaveKey(data, function () {
                        window.location = '<%= ReturnUrl %>';
                    });
                });
            };

            $scope.activate = function () {


                if (!$scope.host || !$scope.key || !$scope.invoiceNo) {
                    $scope.errInput = true;
                    return;
                }

                if (!$scope.licenseType) {
                    fnRegcCoreRequest('<%= GetLicenseTypeUrl %>', {
                        productCode: '<%= avt.ActionForm.Core.App.Info.Code %>',
                        versionCode: '<%= avt.ActionForm.Core.App.Info.Build %>',
                        licenseKey: $scope.invoiceNo,
                        publicKey: $scope.key
                    }, function (data) {
                        $scope.licenseType = data;
                        // if additional info not required, proceed to activation
                        if ($scope.licenseType.code == 'DOM' || $scope.licenseType.code == 'XDOM' || $scope.licenseType.code == 'SRV') {
                            $scope.loading = false;
                        } else {
                            fnActivate();
                        }
                    });
                    return;
                }


                // if license type is set, activate
                fnActivate();

            };

            $scope.unlockTrial = function () {

                if (!$scope.host || !$scope.username || !$scope.password) {
                    $scope.errInput = true;
                    return;
                }

                fnRegcCoreRequest('<%= UnlockTrialUrl %>', {
                    productCode: '<%= avt.ActionForm.Core.App.Info.Code %>',
                    versionCode: '<%= avt.ActionForm.Core.App.Info.Build %>',
                    host: $scope.host,
                    username: $scope.username,
                    password: $scope.password
                }, function (data) {
                    fnSaveKey(data, function () {
                        window.location = '<%= ReturnUrl %>';
                    });
                });

            };

        }


    </script>
</body>
</html>

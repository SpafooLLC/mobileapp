<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucClient.ascx.cs" Inherits="Netsam.Modules.NS_UserProfile.UC.ucClient" %>
<div class="bread">
    <a href="" onclick="NS_GoBack(); return false;" class="pback"><i class="fa fa-angle-left fa-2x"></i></a>
    <div class="ptitle"><label id="lblTopHeader">My Profile</label></div>
    <div class="pnotification" onclick="NS_ScrollToNoti();return false;" style="cursor:pointer;">
        <div class="ico" >
            <a href='#' ><i class="fa blue fa-bell fa-1x"></i></a>
        </div>
        <div id='notification'><%=this.GetUnseenCount%></div>
    </div>
</div>
<div id="dvClientInfo" class="mainouter NS_On"></div>
<div class="dvEditClientInfo NS_Off" ></div>
<script src="/DesktopModules/NS_UserProfile/Scripts/user.js"></script>
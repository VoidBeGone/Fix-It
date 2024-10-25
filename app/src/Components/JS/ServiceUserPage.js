import "../style/ServiceUserPage.css";
import React from "react";
import {gsap} from "gsap";


export default function SearcherUserPage({}){

    return (
      <div className = "SearchUserPage">
        <div className = "SUPHolderContainer">
            <div className = "SUPContent">
                <div className = "SUPTitle">Title</div>
                <div className="SUPDescription">Description: </div>
                <div className ="SUPDate">Time: </div>
                <div className="ApproveDecline">
                    <div className = "Approve"></div>
                    <div className = "Decline"></div>
                </div>
            </div>
            <div className = "SUPContent">
                <div className = "SUPTitle">Title</div>
                <div className="SUPDescription">Description: </div>
                <div className ="SUPDate">Time: </div>
                <div className="ApproveDecline">
                    <div className = "Approve"></div>
                    <div className = "Decline"></div>
                </div>
            </div>
            <div className = "SUPContent">
                <div className = "SUPTitle">Title</div>
                <div className="SUPDescription">Description: </div>
                <div className ="SUPDate">Time: </div>
                <div className="ApproveDecline">
                    <div className = "Approve"></div>
                    <div className = "Decline"></div>
                </div>
            </div>
        </div>
      </div>  
    );
}
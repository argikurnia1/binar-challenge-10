import React from "react";

const WYMGameInfo = ({props}) => {
    console.log("modal",props)
    return (
        <div>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Launch demo modal
          </button>
          
          {/* <!-- Modal --> */}
          <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">CURRENT SCORE</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h1>Gatcha Round: {props.ronde}</h1>
                  <h1>Luck Status: {props.status}</h1>
                  <h1>Total Score: {props.score}</h1>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  };
  
  export default WYMGameInfo;
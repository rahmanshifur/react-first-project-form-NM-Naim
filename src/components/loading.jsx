import React from "react";

function Loading() {
    return (
        <div className="d-flex align-items-center">
            <strong>Loading...</strong>
            <div
                className="spinner-border text-warning "
                role='status'
                arial-hidden='true'
                style={{ marginLeft: 'auto' }}
            >
            </div>
        </div>
    )
}

export default Loading;
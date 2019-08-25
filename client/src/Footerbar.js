import React from 'react'

const Footerbar = () => {
    let d = new Date();
    return ( <div className="bg-white text-center p-3">
            <h6>
                Copyright © {d.getFullYear()} | Deal Seeker | LK
            </h6>
        </div> );
}

export default Footerbar;
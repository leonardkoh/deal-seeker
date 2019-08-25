import React from 'react'

const Pagination = (props) => {
    return(
        <nav aria-label="page-selector">
            <div>
            ACTIVE PAGE IS {props.PageNumber}
            </div>
        <ul className="pagination justify-content-center">
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item" aria-current="page">
            <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
          </li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
        </ul>
      </nav>
    )
}

export default Pagination;
import React from 'react';

const LIMIT = 10

const PeopleTablePagination = ({page, total, onChange = () => {}}) => {
    const totalPages = Math.ceil(total / LIMIT)
    return (
        <div>
                {Array.from({length: totalPages}, (_, index) => index + 1).map(pageIndex => {
                    const isActive = pageIndex === page
                    const action = () => {
                        if (pageIndex !== page) {onChange(pageIndex)}}
                    return isActive ? (
                        <b style={{padding: 10 + 'px'}} key={pageIndex} onClick={action}>{pageIndex}</b>
                    ) :
                    (
                        <span style={{padding: 10 + 'px'}} key={pageIndex} onClick={action}>{pageIndex}</span>
                    )
                })}
        </div>
    );
};

export default PeopleTablePagination;
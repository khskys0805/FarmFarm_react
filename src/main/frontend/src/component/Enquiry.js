const Enquiry = ({enquiry}) => {
    return (
        <div className="enquiry_list">
            <div className="item-title-row">
                <div className="item-title">${enquiry.user.nickname}님</div>
            </div>
            <p className="li_en">${enquiry.content}</p>
            <i className="fa-regular fa-trash-can" onClick="confirmAndDeleteEnquiry(${enquiry.EId})"></i>
        </div>
    )
}
export default Enquiry;
const Contact = () => (
    <div className="container" style={{maxWidth:'600px'}}>
        <h2>Contact Us</h2>
        <form className="card" style={{padding:'2rem'}}>
            <div className="form-group"><label>Name</label><input /></div>
            <div className="form-group"><label>Email</label><input /></div>
            <div className="form-group"><label>Message</label><textarea style={{width:'100%', padding:'0.5rem'}} rows="5"></textarea></div>
            <button className="btn btn-primary">Send Message</button>
        </form>
    </div>
);
export default Contact;

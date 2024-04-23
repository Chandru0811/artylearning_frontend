import React from "react";
import { Link } from "react-router-dom";

function TermsConditions() {
    return (
        <section style={{ backgroundColor: "#f9fafb" }}>
            <div className="container py-5">
                <div className="row mb-5">
                    <div className="col-12">
                        <h1 className="fw-bold mb-5" style={{ fontSize: "65px" }}>Terms & Conditions</h1>
                        <p style={{ fontSize: "20px" }}>"I consent to the collection, use, and disclosure of my personal information and the personal information of my child by Arty Learning Pte Ltd, its related entities, and franchisees (individually and collectively the “Arty Learning Group”) for the following purposes: (a) processing and responding to my inquiries; (b) providing services and sending you information on special events, promotions, offers, and other marketing and promotional material; and (c) such other purposes as outlined in Section 2 of Arty Learning's Privacy Policy, which can be accessed at <Link to="/privacypolicy" style={{ color: 'red', textDecoration: 'underline' }}>https://artylearning.com.sg/privacy-policy/</Link>, in accordance with relevant data protection regulations and Arty Learning's Privacy Policy.</p>
                        <p style={{ fontSize: "20px" }}>I acknowledge that I have read and consent to the above, and you may contact me via my email, telephone, SMS, and/or other phone number-based messaging at the details provided in this form."</p>
                        <h1 className="mb-4 mt-4 fw-bold" >TERMS OF USE</h1>
                        <p style={{ fontSize: "20px" }}>Thank you for visiting Arty Learning Pte Ltd’s website (“Website”). By accessing and using any part of the Website, you shall be deemed to have accepted to be legally bound by these Terms of Use. If you do not agree to these Terms of Use, please do not use the Website. Any continued use of the Website at any time will imply that you have accepted these Terms of Use.</p>
                        <h1 className="mb-4 mt-4" style={{ fontWeight: "1000" }}>General</h1>
                        <p style={{ fontSize: "20px" }}>These Terms of Use may be changed from time to time. All changes will be posted on this page, and your use of the Website after such changes have been posted will constitute your agreement to the Terms of Use as changed.</p>
                        <h1 className="mb-4 mt-4" style={{ fontWeight: "1000" }}>Proprietary Rights</h1>
                        <p style={{ fontSize: "20px" }}>This Website and its contents are protected by copyright, trademark and other forms of proprietary rights. All rights, title and interest in the Website and its contents are owned by or licensed to Arty Learning Pte Ltd (“Arty Learning”).</p>
                        <h1 className="mb-4 mt-4" style={{ fontWeight: "1000" }}>Restriction On Use</h1>
                        <p style={{ fontSize: "20px" }}>No part of the contents or materials available on this Website may be reproduced, republished, transmitted, uploaded, posted or otherwise distributed in any way without the prior written permission of Arty Learning. You may view this Website and its contents using your Web browser and save an electronic copy, or print out a copy, of limited parts of this Website solely for your own information, research or study, provided you keep intact all accompanying copyright and other proprietary notices. Modification of any part of the Website or any of its contents, or use of the Website or its contents for any purpose other than allowed by these Terms of Use will be a violation of Arty Learning’s copyright and other intellectual property rights.</p>
                        <h1 className="mb-4 mt-4" style={{ fontWeight: "1000" }}>Disclaimer</h1>
                        <p style={{ fontSize: "20px" }}>The information on this Website is provided on an “as is” basis without warranties of any kind. Arty Learning has made a reasonable endeavour to ensure that the information and materials posted on this Website are correct at the time of posting. However, Arty Learning gives no warranty and accepts no responsibility or liability for the accuracy or completeness of the information and materials provided here for any purpose whatsoever. No reliance should be made by any user on the information or material so posted; instead, the user should independently verify the accuracy and completeness of the information and/or materials with Arty Learning.</p>
                        <p style={{ fontSize: "20px" }}>The user acknowledges and agrees that Arty Learning shall not be held responsible or liable in any way for any and/or all consequences (including, without limitation, damages for loss of profits, business interruption, or loss of information) that may be incurred by the user as a direct or indirect result of using, or the inability to use, any materials or contents on this Website, even if the Arty Learning has been advised of the possibility of such damages in advance.</p>
                        <h1 className="mb-4 mt-4" style={{ fontWeight: "1000" }}>Links to Other Websites</h1>
                        <p style={{ fontSize: "20px" }}>This Website may contain links to other World Wide Web sites or resources operated by parties other than Arty Learning. Such links are provided as a service for the convenience of the users of this Website. As Arty Learning has no control over such sites and resources, the user acknowledges and agrees that Arty Learning is not responsible nor liable for any content or material on or available from such sites or resources.</p>
                        <p style={{ fontSize: "20px" }}>In providing such links, Arty Learning does not in any way, expressly or implicitly, endorse the linked sites or resources or the respective contents thereof. The user further acknowledges and agrees that Arty Learning shall not be responsible or liable, whether directly or indirectly, for any damage or loss caused or sustained by or alleged to be caused or sustained by the user, in connection with the use or reliance on any information or material available on such linked sites or resources.</p>
                        <p style={{ fontSize: "20px" }}>Arty Learning should be notified in advance of any links to its Website from external websites and reserves the right to disable any unauthorised links. Deep linking to and framing of pages and contents of the Website are prohibited. The contents of this Website should not be accompanied in any way by third-party material that may create a false or mistaken impression in the mind of the user about Arty Learning’s affiliation or association with or endorsement of the third-party website or material.</p>
                        <h1 className="mb-4 mt-4" style={{ fontWeight: "1000" }}>Governing Law</h1>
                        <p style={{ fontSize: "20px" }}>These Terms of Use shall be governed and construed in accordance with the laws of the Republic of Singapore.</p>
                        <h1 className="mb-4 mt-4" style={{ fontWeight: "1000" }}>Contact Information</h1>
                        <p style={{ fontSize: "20px" }}>Arty Learning welcomes any queries pertaining to our Privacy Policy, and we can be reached at:</p>
                        <p style={{ fontSize: "20px" }}>
                            Arty Learning
                            <ul style={{ listStyle: "none", marginLeft: "-35px" }}>
                                <li>806 Hougang Central,</li>
                                <li>#04-146</li>
                                <li>Singapore (530806)</li>
                                <li>Email: <Link style={{ color: 'red', textDecoration: 'underline' }}>artylearning@gmail.com</Link></li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TermsConditions;
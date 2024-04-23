import React from "react";
import Alphabet from "../../../assets/clientimage/Alphabet.png";

function ChineseBanner() {
  return (
    <div className="container-fluid font-styles">
      <div className="row remove-padding">
        <div className="col-md-6 col-12 bgchimage ">
          <div className="py-5 firsthead  d-flex flex-column  justify-content-center align-items-center">
            <img src={Alphabet} alt="english" width={80}></img>
            <h1>Chinese Class</h1>
          </div>
        </div>
        <div className="col-md-6 col-12 p-5">
          <h2 className="mb-3 headcolor">Chinese Enrichment Class</h2>
          <p className="headbody">
            我们希望每个孩子都能从老师那里得到更加个性化的关注，根据每个孩子的具体需求、优势和挑战，提供量身定制的指导和支持，所以各班师生比例限于1：4。
          </p>
          <p className="headbody">
            学习应该对所有人来说都是有趣的！
            我们通过不同的游戏，儿歌，实验，手工等来激发孩子学习华文，促进孩子的听、说、读、写全方面的进步。并通过我们Arty
            Learning家园网站上传课堂的视频和照片，供家长参考，方便孩子在家中复习，为孩子学习提供支持性环境
          </p>
          <p className="headbody">我们希望在家园的共同努力下，促进孩子学习华文，追求卓越。</p>
          <p className="headbody">
            With our <b>small ratio</b> of 1 teacher to 4 students, each student
            will receive a more <b>personalised</b> attention from their
            teacher. This allows the teacher to better understand the specific
            needs, strengths, and challenges of each student, enabling them to
            provide tailored instruction and support.
          </p>
          <p className="headbody">We believe learning should be fun for all!</p>
          <p className="headbody">
            All our teachers are specially trained by our curriculum specialist.
            They are skilled to <b>analyse</b> specific needs, strengths and
            every challenge that each student faces.
          </p>
          <p className="headbody">
            Parents’ involvement in a child’s learning journey is crucial.
          </p>
          <p className="headbody">
            We take <b>Videos and pictures</b> of every student and deliver them
            to parents through our very own <b> Arty Parents’ Portal</b>.
            Conveniently developed to reinforce learning while enhancing
            parents’ involvement.
          </p>
          <p className="headbody">
            Regular communication with teachers provides a supportive
            environment for learning and can contribute to academic successes.
            By showing interest and actively participating in their child's
            education, parents instil a positive attitude towards learning and
            helps to encourage children to strive for excellence.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChineseBanner;

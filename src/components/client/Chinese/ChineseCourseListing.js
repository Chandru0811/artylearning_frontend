import React from "react";
import believer from "../../../assets/clientimage/Arty-(Believer).png";
import dreamer from "../../../assets/clientimage/Arty-(Dreamer).png";
import pursuer from "../../../assets/clientimage/Arty-(Prusuers).png";

function ChineseCourseListing() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-5 ">
          <p className="headbody">
            In our Chinese Enrichment Class, children will embark on a
            captivating journey to explore the richness of the Chinese language
            and culture. Through engaging activities, interactive lessons, and
            cultural experiences, students will develop their proficiency in
            speaking, listening, reading, and writing Mandarin. Our experienced
            educators will guide them in learning essential language skills
            while also immersing them in the beauty of Chinese traditions and
            customs. From mastering the strokes of Chinese characters to
            engaging in everyday conversations, this class aims to provide a
            comprehensive foundation in the language. By incorporating games,
            multimedia resources, and collaborative projects, children will not
            only gain fluency in Chinese but also a deep appreciation for the
            cultural nuances that make the language come alive.
          </p>
        </div>
        <div className="col-md-4 col-12 mt-3">
          <div className="card h-100 p-3 shadow mb-5 bg-white rounded">
            <div className="p-3">
              <img src={believer} alt="..." className="img-fluid"></img>
            </div>
            <h1 className="text-center"> Arty 信念 (初级班)</h1>
            <p className="headbody">
              -简单的日常对话 -认读简单的汉字 -书写简单的笔画和汉字
            </p>
          </div>
        </div>
        <div className="col-md-4 col-12 mt-3">
          <div className="card p-3 h-100 shadow mb-5 bg-white rounded">
            <div className="p-3">
              <img src={dreamer} alt="..." className="img-fluid mb-3"></img>
            </div>
            <h1 className="text-center"> Arty 梦想 (中级班)</h1>
            <p className="headbody">
              -完整的表达自己想法 -学习常用笔画 -认读和书写常用汉字
              -认读简单拼音和声调
            </p>
          </div>
        </div>
        <div className="col-md-4 col-12 mt-3">
          <div className="card h-100 p-3 shadow mb-5 bg-white rounded">
            <div className="p-3">
              <img src={pursuer} alt="..." className="img-fluid"></img>
            </div>
            <h1 className="text-center">Arty 追寻(高级班)</h1>
            <p className="headbody">
              -能持续性的日常沟通 -汉语拼音 -认读和书写常用汉字 -听写练习
            </p>
          </div>
        </div>
        <div className="row py-5">
          <div className="col-12">
            <p className="headbody">
              Our children are placed into classes according to their language
              ability and not by standard educational age.
            </p>
            <p>
              (Therefore we may ask you to bring your child down for a FREE
              observation/assessment, only if we have available and suitable
              slot; based on your waitlist questions answered)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChineseCourseListing;

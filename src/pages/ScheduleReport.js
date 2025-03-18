import React from "react";

const scheduleData = {
  teacherList: [
    "Jen",
    "Jing En",
    "Mogana",
    "Vivian",
    "XP",
    "Joyce",
    "Jolene",
    "Ya Jing",
  ],
  data: [
    {
      period: "28 Jan - 2 Feb",
      days: [
        {
          day: "Monday",
          records: [
            {
              batch: "10:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "AP59 Silent E story" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP58 Trigraph rev" },
                { teacher: "XP", curriculumCode: "N/A" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                {
                  teacher: "Ya Jing",
                  curriculumCode: "AP 49 h bro ch sh spelling",
                },
              ],
            },
            {
              batch: "12:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "SLSOE" },
                { teacher: "Jing En", curriculumCode: "CLIPE" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "N/A" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "N/A" },
              ],
            },
          ],
        },
        {
          day: "Tuesday",
          records: [
            {
              batch: "15:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "17:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "19:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "AP58  trigraph rev" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
        {
          day: "Wednesday",
          records: [
            {
              batch: "15:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "AP07 CVC ad Ob vin" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "17:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "AP 71 2 vowels oa, oe, ow" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "AD /e/" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "18:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                {
                  teacher: "Mogana",
                  curriculumCode: "AP 49 h bro ch sh spelling",
                },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "19:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
        {
          day: "Thursday",
          records: [
            {
              batch: "14:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                {
                  teacher: "XP",
                  curriculumCode: " AP 36 blends br, cr, dr, tr, gr, pr",
                },
                {
                  teacher: "Joyce",
                  curriculumCode: "AP72 2 vowel rev & AP53 ph",
                },
                { teacher: "Jolene", curriculumCode: "AP 18 CVC ip" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "15:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                {
                  teacher: "XP",
                  curriculumCode: " AP 36 blends br, cr, dr, tr, gr, pr",
                },
                {
                  teacher: "Joyce",
                  curriculumCode: "AP72 2 vowel rev & AP53 ph",
                },
                { teacher: "Jolene", curriculumCode: "AP 18 CVC ip" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "17:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "N/A" },
                { teacher: "XP", curriculumCode: "AB y" },
                { teacher: "Joyce", curriculumCode: "AP02 cvc at" },
                { teacher: "Jolene", curriculumCode: "AP45 ee 2" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "19:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "AD x AD y" },
                { teacher: "Joyce", curriculumCode: "AP83 er ir ur" },
                { teacher: "Jolene", curriculumCode: "AP52 h bro th" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
        {
          day: "Friday",
          records: [
            {
              batch: "15:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "AP 73 Spelling oi oy" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "N/A" },
              ],
            },
            {
              batch: "17:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "AP02 cvc at" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "19:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "N/A" },
                { teacher: "XP", curriculumCode: "AB v" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "AP60 Silent E a_e a_ce" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
        {
          day: "Saturday",
          records: [
            {
              batch: "09:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                {
                  teacher: "Vivian",
                  curriculumCode: "AP61 silent e i_e i_ce o_e (Asha observer)",
                },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP64 hard & Soft g" },
                { teacher: "Jolene", curriculumCode: "" },
                {
                  teacher: "Ya Jing",
                  curriculumCode: "AD revision - Practicum Ya Jing",
                },
              ],
            },
            {
              batch: "10:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                {
                  teacher: "Vivian",
                  curriculumCode: "AP33 ck (Asha Observer)",
                },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP02 cvc at" },
                { teacher: "Jolene", curriculumCode: "" },
                {
                  teacher: "Ya Jing",
                  curriculumCode: "AB l - Practicum Ya Jing",
                },
              ],
            },
            {
              batch: "13:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP33 ck " },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP56 oo 2" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "15:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP75 ghos wr" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP10 cvc et" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "16:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP04 cvc am" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AD /d/" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
        {
          day: "Sunday",
          records: [
            {
              batch: "09:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                {
                  teacher: "Jing En",
                  curriculumCode: "AP04 CVC at - Obs Tannya",
                },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                {
                  teacher: "Ya Jing",
                  curriculumCode: "AP51 h bro wh 2- Practicum Ya Jing",
                },
              ],
            },
            {
              batch: "10:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                {
                  teacher: "Vivian",
                  curriculumCode: "AP33 ck (Asha Observer)",
                },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP02 cvc at" },
                { teacher: "Jolene", curriculumCode: "" },
                {
                  teacher: "Ya Jing",
                  curriculumCode: "AB l - Practicum Ya Jing",
                },
              ],
            },
            {
              batch: "13:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP33 ck " },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP56 oo 2" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "15:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP75 ghos wr" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP10 cvc et" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "16:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP04 cvc am" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AD /d/" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
      ],
    },
    {
      period: "04 Feb - 9 Feb",
      days: [
        {
          day: "Monday",
          records: [
            {
              batch: "10:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "AP59 Silent E story" },
                { teacher: "Jing En", curriculumCode: "AP58 Trigraph rev" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "N/A" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                {
                  teacher: "Ya Jing",
                  curriculumCode: "AP 49 h bro ch sh spelling",
                },
              ],
            },
            {
              batch: "12:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "SLSOE" },
                { teacher: "Jing En", curriculumCode: "CLIPE" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "N/A" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "N/A" },
              ],
            },
          ],
        },
        {
          day: "Tuesday",
          records: [
            {
              batch: "15:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "17:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "19:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "AP58  trigraph rev" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
        {
          day: "Wednesday",
          records: [
            {
              batch: "15:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "AP07 CVC ad Ob vin" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "17:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "AP 71 2 vowels oa, oe, ow" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "AD /e/" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "18:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                {
                  teacher: "Mogana",
                  curriculumCode: "AP 49 h bro ch sh spelling",
                },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "19:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
        {
          day: "Thursday",
          records: [
            {
              batch: "14:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                {
                  teacher: "XP",
                  curriculumCode: " AP 36 blends br, cr, dr, tr, gr, pr",
                },
                {
                  teacher: "Joyce",
                  curriculumCode: "AP72 2 vowel rev & AP53 ph",
                },
                { teacher: "Jolene", curriculumCode: "AP 18 CVC ip" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "15:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                {
                  teacher: "XP",
                  curriculumCode: " AP 36 blends br, cr, dr, tr, gr, pr",
                },
                {
                  teacher: "Joyce",
                  curriculumCode: "AP72 2 vowel rev & AP53 ph",
                },
                { teacher: "Jolene", curriculumCode: "AP 18 CVC ip" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "17:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "N/A" },
                { teacher: "XP", curriculumCode: "AB y" },
                { teacher: "Joyce", curriculumCode: "AP02 cvc at" },
                { teacher: "Jolene", curriculumCode: "AP45 ee 2" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "19:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "AD x AD y" },
                { teacher: "Joyce", curriculumCode: "AP83 er ir ur" },
                { teacher: "Jolene", curriculumCode: "AP52 h bro th" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
        {
          day: "Friday",
          records: [
            {
              batch: "15:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "AP 73 Spelling oi oy" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "N/A" },
              ],
            },
            {
              batch: "17:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "AP02 cvc at" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "19:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "N/A" },
                { teacher: "XP", curriculumCode: "AB v" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "AP60 Silent E a_e a_ce" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
        {
          day: "Saturday",
          records: [
            {
              batch: "09:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                {
                  teacher: "Vivian",
                  curriculumCode: "AP61 silent e i_e i_ce o_e (Asha observer)",
                },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP64 hard & Soft g" },
                { teacher: "Jolene", curriculumCode: "" },
                {
                  teacher: "Ya Jing",
                  curriculumCode: "AD revision - Practicum Ya Jing",
                },
              ],
            },
            {
              batch: "10:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                {
                  teacher: "Vivian",
                  curriculumCode: "AP33 ck (Asha Observer)",
                },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP02 cvc at" },
                { teacher: "Jolene", curriculumCode: "" },
                {
                  teacher: "Ya Jing",
                  curriculumCode: "AB l - Practicum Ya Jing",
                },
              ],
            },
            {
              batch: "13:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP33 ck " },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP56 oo 2" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "15:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP75 ghos wr" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP10 cvc et" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "16:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP04 cvc am" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AD /d/" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
          ],
        },
        {
          day: "Sunday",
          records: [
            {
              batch: "09:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                {
                  teacher: "Jing En",
                  curriculumCode: "AP04 CVC at - Obs Tannya",
                },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                {
                  teacher: "Ya Jing",
                  curriculumCode: "AP51 h bro wh 2- Practicum Ya Jing",
                },
              ],
            },
            {
              batch: "10:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "N/A" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                {
                  teacher: "Vivian",
                  curriculumCode: "AP33 ck (Asha Observer)",
                },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP02 cvc at" },
                { teacher: "Jolene", curriculumCode: "" },
                {
                  teacher: "Ya Jing",
                  curriculumCode: "AB l - Practicum Ya Jing",
                },
              ],
            },
            {
              batch: "13:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP33 ck " },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP56 oo 2" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "15:00",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "AP75 ghos wr" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "AP10 cvc et" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "" },
              ],
            },
            {
              batch: "16:30",
              curriculamData: [
                { teacher: "Jen", curriculumCode: "" },
                { teacher: "Jing En", curriculumCode: "AP04 cvc am" },
                { teacher: "Mogana", curriculumCode: "" },
                { teacher: "Vivian", curriculumCode: "" },
                { teacher: "XP", curriculumCode: "" },
                { teacher: "Joyce", curriculumCode: "" },
                { teacher: "Jolene", curriculumCode: "" },
                { teacher: "Ya Jing", curriculumCode: "AD /d/" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const ScheduleTable = () => {
  return (
    <div className="timetable-container">
      <div className="table-wrapper">
        <table className="timetable">
          <thead>
            <tr>
              <th className="period-cell bg-dark">Period</th>
              <th className="period-cell bg-dark">Day</th>
              <th className="period-cell bg-dark">Time</th>
              {scheduleData.teacherList.map((teacher) => (
                <th key={teacher}>{teacher}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduleData.data.map((periodData, periodIndex) => {
              const { period, days } = periodData;
              const totalRowsInPeriod = days.reduce(
                (total, d) => total + d.records.length,
                0
              );

              return (
                <React.Fragment key={period}>
                  {/* Add spacer row between periods */}
                  {periodIndex > 0 && (
                    <tr className="period-spacer">
                      <td colSpan={scheduleData.teacherList.length + 3} />
                    </tr>
                  )}
                  {days.map((dayData, dayIndex) =>
                    dayData.records.map((record, recordIndex) => (
                      <tr key={dayData.day + record.batch}>
                        {/* Period column: Spans all rows for the full period */}
                        {dayIndex === 0 && recordIndex === 0 && (
                          <td
                            rowSpan={totalRowsInPeriod}
                            className="period-cell"
                          >
                            {period}
                          </td>
                        )}
                        {/* Day column: Spans all time slots for the day */}
                        {recordIndex === 0 && (
                          <td
                            rowSpan={dayData.records.length}
                            className="day-cell"
                          >
                            {dayData.day}
                          </td>
                        )}
                        <td className="time-cell">{record.batch}</td>
                        {scheduleData.teacherList.map((teacher) => {
                          const teacherData = record.curriculamData.find(
                            (t) => t.teacher === teacher
                          );
                          return (
                            <td
                              key={teacher + record.batch}
                              className="data-cell"
                            >
                              {teacherData?.curriculumCode || ""}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;

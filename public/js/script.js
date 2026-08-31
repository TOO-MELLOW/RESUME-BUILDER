const ACCENT_COLORS = [
    { label: "Teal",     v: "#2F6F63" }, { label: "Navy",     v: "#1B2A4A" },
    { label: "Slate",    v: "#3B5BA9" }, { label: "Burgundy", v: "#7B2D3E" },
    { label: "Forest",   v: "#264D3B" }, { label: "Rose",     v: "#C1447E" },
    { label: "Sienna",   v: "#B2562F" }, { label: "Charcoal", v: "#3D3D3D" }
];
const PAPER_COLORS = [
    "#FAF6EF","#EAEEE1","#F2E8D8","#EAE3DE","#F5E9C8",
    "#E4EAD8","#E7DFD7","#F3DEDA","#FFFDF9","#F0EDE8"
];

const SIDEBAR_TYPES = new Set(["personal-info","skills","languages","certificates","references","interests","strengths","projects","custom"]);
const MAIN_TYPES    = new Set(["experience","education"]);

const BLANK = {
    "personal-info": () => ({ id: genId("pi"),   label: "", value: "" }),
    experience:      () => ({ id: genId("exp"),  role: "", company: "", location: "", startDate: "", endDate: "", current: false, bullets: [] }),
    education:       () => ({ id: genId("edu"),  qualification: "", institution: "", location: "", startDate: "", endDate: "", current: false, notes: "" }),
    projects:        () => ({ id: genId("prj"),  name: "", url: "", bullets: [] }),
    custom:          () => ({ id: genId("cus"),  title: "", bullets: [] }),
    skills:          () => ({ id: genId("skl"),  name: "", level: "" }),
    languages:       () => ({ id: genId("lng"),  name: "", level: "" }),
    certificates:    () => ({ id: genId("cert"), name: "" }),
    references:      () => ({ id: genId("ref"),  name: "", title: "", phone: "", email: "" }),
    interests:       () => ({ id: genId("int"),  value: "" }),
    strengths:       () => ({ id: genId("str"),  value: "" })
};

 const allTemplateIds = TEMPLATE_CONFIGS.map(t => t.id);

    function generateLegacyThumbnailSVG(templateId, accent) {
        // Deterministic, content-shaped thumbnail for templates that previously
        // fell through to the blank fallback. Geometry changes by template ID;
        // it is intentionally recognizable as a CV rather than a placeholder.
        const seed = parseInt(hashString(templateId).slice(0, 8), 16);
        const bg = PAPER_COLORS[seed % PAPER_COLORS.length];
        const left = 18 + (seed % 24);
        const right = 100 - left;
        const mode = (seed >>> 5) % 8;
        const line = (x,y,w,h,fill,op=.32) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1" fill="${fill}" opacity="${op}"/>`;
        const rr = (x,y,w,h,r,fill,op) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${op!=null?` opacity="${op}"`:''}/>`;
        const txt = (x,y,fs,fill,content,anchor='start') => `<text x="${x}" y="${y}" font-family="sans-serif" font-size="${fs}" fill="${fill}" text-anchor="${anchor}" font-weight="700">${content}</text>`;
        let body = rr(0,0,100,141,2,bg,null);
        const dark = '#23303A';
        if (mode===0) {
            body += rr(0,0,left,141,0,accent,.92);
            body += txt(left+5,15,7,dark,'JANE MOKOENA');
            for(let j=0;j<7;j++) body += line(6,30+j*13,left-9,2,'#fff',.34);
            for(let j=0;j<6;j++) body += line(left+5,32+j*17,right-9,3,dark,.24);
        } else if (mode===1) {
            body += rr(0,0,100,25,0,accent,.9);
            body += txt(8,12,7,'#fff','JANE MOKOENA');
            body += txt(8,19,4,'#fff','PROFESSIONAL PROFILE');
            for(let j=0;j<6;j++){ body += line(8,34+j*16,84,2,dark,.25); body += line(8,38+j*16,55,2,accent,.35); }
        } else if (mode===2) {
            body += txt(8,15,10,dark,'JANE MOKOENA');
            body += txt(8,22,5,accent,'CAREER PROFILE');
            body += rr(8,30,24,93,0,accent,.12);
            for(let j=0;j<6;j++) body += line(38,34+j*15,54,3,dark,.26);
        } else if (mode===3) {
            body += rr(8,8,84,28,3,'#fff',1);
            body += rr(8,8,5,28,0,accent,.9);
            body += txt(18,19,8,dark,'JANE');
            body += txt(18,27,7,dark,'MOKOENA');
            for(let j=0;j<4;j++) body += rr(8,43+j*20,84,14,2,'#fff',1);
            for(let j=0;j<4;j++) body += line(13,49+j*20,55,3,accent,.22);
        } else if (mode===4) {
            body += rr(0,0,14,141,0,accent,.94);
            body += txt(21,17,8,dark,'JANE MOKOENA');
            for(let j=0;j<7;j++) body += line(21,31+j*14,69,2,dark,.27);
            body += rr(73,31,18,58,2,accent,.14);
        } else if (mode===5) {
            body += rr(0,0,100,14,0,accent,.9);
            body += txt(8,26,9,dark,'JANE MOKOENA');
            body += line(8,31,84,2,accent,.6);
            for(let j=0;j<5;j++){ body += txt(8,46+j*18,4,accent,'SECTION'); body += line(26,43+j*18,60,3,dark,.22); }
        } else if (mode===6) {
            body += rr(8,8,31,22,2,accent,.16);
            body += txt(11,20,8,dark,'PROFILE');
            body += txt(47,18,8,dark,'JANE MOKOENA');
            for(let j=0;j<5;j++) body += rr(8,37+j*19,84,14,2,'#fff',1);
            for(let j=0;j<5;j++) body += line(12,43+j*19,48,2,accent,.3);
        } else {
            body += rr(0,0,100,33,0,'#fff',1);
            body += txt(8,15,8,dark,'JANE MOKOENA');
            body += txt(8,23,4,accent,'CURRICULUM VITAE');
            body += rr(8,41,26,83,0,accent,.13);
            for(let j=0;j<6;j++) body += line(40,45+j*13,51,2,dark,.25);
        }
        return body;
    }

    function hashString(value) {
        let h = 2166136261;
        for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
        return (h >>> 0).toString(16).padStart(8, '0');
    }

    function generateThumbnailSVG(templateId) {
        const a = getTemplateDefaultColor(templateId);
        const rr = (x,y,w,h,r,fill,op) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${op!=null?` opacity="${op}"`:''}/>`;
        const line = (x,y,w,h,fill,op) => rr(x,y,w,h,1,fill,op!=null?op:0.4);
        const txt = (x,y,fs,fill,content,anchor) => `<text x="${x}" y="${y}" font-family="sans-serif" font-size="${fs}" fill="${fill}"${anchor?` text-anchor="${anchor}"`:''} font-weight="700">${content}</text>`;
        let body='';
        const named = {
          'combined-01':['#F4F8F5',a,'PROFILE'], 'combined-02':['#FBF3EE',a,'ONE STORY'], 'combined-03':['#F4F6FB',a,'STEADY PATH'], 'combined-04':['#F7F7F2',a,'ALL TOGETHER'],
          'practical-01':['#F8FAF8',a,'READY TO WORK'], 'practical-02':['#F2F5F8',a,'ON CALL'], 'practical-03':['#F7F4EF',a,'HANDS ON'],
          'functional-01':['#F7FAF8',a,'STRONG SUIT'], 'functional-02':['#F5F7FB',a,'NEW DIRECTION'], 'functional-03':['#FCF7F1',a,'TURNING POINT'],
          'trade-01':['#F2F5F7',a,'ON THE TOOLS'], 'trade-02':['#2A211C',a,'CERTIFIED'], 'trade-03':['#F3F3F3',a,'SKILLED HANDS'],
          'starter-01':['#FBFCFB',a,'STARTER CLASSIC'], 'starter-02':['#F6F8FA',a,'STARTER WARM'], 'starter-03':['#FBF8F2',a,'STARTER COOL'],
          'mono-01':['#F9F7F1',a,'STONEWOOD'], 'mono-02':['#F4F7F1',a,'SAGEBROOK'], 'mono-03':['#F4F6FB',a,'SLATEVIEW'],
          'facet-01':['#FFFFFF',a,'TERRALINE'], 'facet-02':['#F8FBFA',a,'DEEPWATER'], 'facet-03':['#FBF8FC',a,'PLUMLINE'], 'facet-04':['#FCFAF5',a,'FACET 04'],
          'duo-01':['#FCFBF9',a,'ROSEMERE'], 'duo-02':['#F7FAF6',a,'WILLOWGREEN'], 'duo-03':['#F7F6F3',a,'WARMSTONE'], 'graphite-sidebar-01':['#F2F4F5',a,'GRAPHITE'], 'ivory-editorial-sidebar-02':['#FBF7EF',a,'EDITORIAL'], 'navy-vertical-rail-03':['#EEF3F8',a,'VERTICAL RAIL'], 'burgundy-two-page-04':['#F8F0F1',a,'HERITAGE'], 'forest-profile-sidebar-05':['#F1F5EF',a,'FIELD + OFFICE'], 'black-copper-executive-06':['#F1EFEB',a,'EXECUTIVE'], 'slate-portfolio-07':['#F0F3F6',a,'PORTFOLIO'], 'sand-modern-two-page-08':['#F6F0E7',a,'SAND MODERN'], 'indigo-cards-09':['#F2F1FB',a,'INDIGO CARDS'], 'teal-command-two-page-10':['#EEF8F7',a,'COMMAND']
        };
        if(named[templateId]){
          const [bg,accent,label]=named[templateId];
          body+=rr(0,0,100,141,2,bg,null);
          const i=parseInt((templateId.match(/(\\d+)$/)||['1','1'])[1],10);
          if(templateId==='combined-01'){ body+=rr(0,0,24,141,0,accent,.95); body+=txt(12,16,6,'#fff','PROFILE','middle'); for(let j=0;j<7;j++)body+=line(6,28+j*13,13,2,'#fff',.35); body+=txt(31,15,8,'#222','JANE MOKOENA','start'); for(let j=0;j<5;j++){body+=line(31,28+j*20,60,3,'#333',.25);body+=line(31,34+j*20,48,2,'#888',.25)} }
          else if(templateId==='combined-02'){ body+=rr(0,0,100,11,0,accent,null); body+=txt(8,27,10,'#2B2623','JANE','start'); body+=txt(8,35,10,'#2B2623','MOKOENA','start'); body+=line(8,40,84,1,'#D8C5BA',.8); for(let j=0;j<4;j++){body+=txt(8,51+j*22,5,accent,'SECTION','start');body+=line(8,56+j*22,70,2,'#555',.25)} }
          else if(templateId==='combined-03'){ body+=rr(0,0,100,31,0,'#E7ECF7',null);body+=txt(7,15,9,'#26344F','JANE MOKOENA','start');body+=rr(7,40,22,86,0,'#DDE5F3',null);for(let j=0;j<5;j++){body+=line(34,43+j*17,57,3,'#26344F',.25);body+=line(34,49+j*17,45,2,'#777',.3)} }
          else if(templateId==='combined-04'){ body+=txt(8,15,5,accent,'04 / START','start');body+=txt(8,29,10,'#26301F','JANE MOKOENA','start');for(let j=0;j<6;j++){const x=8+(j%2)*44,y=38+Math.floor(j/2)*28;body+=rr(x,y,40,20,2,j%2?accent:'#fff',j%2?.18:1);body+=line(x+3,y+7,30,2,'#555',.25)} }
          else if(templateId==='practical-01'){body+=rr(7,8,86,18,2,accent,.85);body+=txt(12,20,6,'#fff',label,'start');for(let j=0;j<6;j++){body+=rr(9,34+j*15,8,8,2,'#fff',1);body+=line(21,36+j*15,59,2,accent,.35);body+=line(21,40+j*15,45,2,'#888',.3)} }
          else if(templateId==='practical-02'){body+=rr(0,0,33,141,0,'#DCE5EF',null);body+=txt(7,15,6,'#1B2A4A','AVAILABILITY','start');for(let j=0;j<6;j++)body+=line(7,25+j*12,20,2,accent,.55);body+=txt(41,15,8,'#1B2A4A','JANE MOKOENA','start');for(let j=0;j<6;j++){body+=line(41,28+j*17,50,3,'#1B2A4A',.22)} }
          else if(templateId==='practical-03'){body+=txt(8,17,9,'#332A23','JANE MOKOENA','start');body+=txt(8,24,5,accent,'WORK-READY PROFILE','start');for(let j=0;j<5;j++){body+=rr(8,31+j*20,84,14,1,'#fff',1);body+=rr(8,31+j*20,3,14,0,accent,.75);body+=line(15,36+j*20,55,2,'#777',.3)} }
          else if(templateId==='functional-01'){body+=rr(8,23,84,18,0,'#E2EEE8',null);body+=txt(12,35,6,accent,'CORE SKILLS','start');for(let j=0;j<5;j++){body+=line(8,50+j*15,20,2,accent,.7);body+=line(32,50+j*15,54,2,'#444',.3);body+=rr(73,47+j*15,18,5,2,accent,.18)} }
          else if(templateId==='functional-02'){body+=rr(0,0,9,141,0,accent,null);body+=txt(15,16,8,'#222',label,'start');for(let j=0;j<5;j++){body+=rr(15,31+j*20,9,9,5,accent,.8);body+=line(29,34+j*20,56,2,'#444',.28)} }
          else if(templateId==='functional-03'){body+=rr(7,7,86,24,2,'#F4E5D0',null);body+=txt(11,22,8,'#5A3C20',label,'start');for(let j=0;j<4;j++){body+=rr(8,39+j*22,38,15,2,'#fff',1);body+=line(52,42+j*22,36,2,accent,.38)} }
          else if(templateId==='trade-01'){body+=rr(0,0,100,24,0,'#1B3A4B',null);body+=txt(8,15,8,'#fff',label,'start');for(let j=0;j<6;j++){body+=rr(8,32+j*16,18,6,1,accent,.2);body+=line(31,34+j*16,59,2,'#555',.3)} }
          else if(templateId==='trade-02'){body+=rr(0,0,34,141,0,'#33251D',null);body+=txt(8,17,6,'#fff','CERTS','start');for(let j=0;j<6;j++)body+=line(7,29+j*13,19,2,accent,.6);body+=txt(41,18,9,'#fff',label,'start');for(let j=0;j<5;j++)body+=line(41,30+j*19,48,3,'#fff',.22)}
          else if(templateId==='trade-03'){body+=rr(7,7,86,20,0,'#3D3D3D',null);body+=txt(12,20,7,'#fff',label,'start');for(let j=0;j<5;j++){body+=rr(8,34+j*19,84,13,0,'#fff',1);body+=txt(12,43+j*19,5,'#444','QUALIFICATION','start')}}
          else if(templateId==='starter-01'){body+=txt(8,17,9,'#213229','JANE MOKOENA','start');body+=txt(8,24,5,accent,label,'start');body+=line(8,31,84,2,accent,.6);for(let j=0;j<5;j++){body+=line(8,43+j*17,24,3,accent,.3);body+=line(38,43+j*17,50,2,'#777',.3)}}
          else if(templateId==='starter-02'){body+=rr(0,0,17,141,0,'#2E5E88',null);body+=txt(24,17,8,'#20394F','STARTER','start');for(let j=0;j<6;j++)body+=line(24,30+j*16,62,2,'#555',.28)}
          else if(templateId==='starter-03'){body+=rr(65,0,35,141,0,'#F1E5D4',null);body+=txt(8,17,9,'#4B3826','STARTER COOL','start');for(let j=0;j<5;j++){body+=rr(8,28+j*19,50,12,2,'#fff',1);body+=line(11,33+j*19,37,2,'#777',.28)}}
          else if(templateId==='mono-01'){body+=rr(0,0,100,32,0,'#F0EAE0',null);body+=rr(8,39,25,25,12,accent,.8);body+=txt(20.5,55,9,'#fff','JM','middle');body+=txt(40,47,8,'#29231E','JANE MOKOENA','start');for(let j=0;j<5;j++)body+=line(40,54+j*14,51,2,'#777',.3)}
          else if(templateId==='mono-02'){body+=rr(0,0,18,141,0,'#E7EEE2',null);body+=txt(9,17,6,accent,'JM','middle');body+=txt(25,17,8,'#243022','JANE MOKOENA','start');for(let j=0;j<6;j++)body+=line(25,33+j*16,62,2,'#555',.27)}
          else if(templateId==='mono-03'){body+=txt(8,17,8,'#20283A','JANE MOKOENA','start');body+=line(8,23,84,2,accent,.7);for(let j=0;j<5;j++){body+=txt(8,43+j*18,5,accent,'SECTION','start');body+=line(27,41+j*18,62,2,'#555',.28)}}
          else if(templateId==='facet-01'){body+=rr(0,0,32,141,0,accent,null);body+=txt(16,17,7,'#fff','PROFILE','middle');body+=rr(7,27,18,18,9,'#fff',.15);body+=txt(40,17,9,'#222','JANE','start');for(let j=0;j<5;j++)body+=line(40,30+j*20,51,3,accent,.22)}
          else if(templateId==='facet-02'){body+=rr(0,0,26,141,0,accent,null);body+=txt(33,15,8,'#22342D','DEEPWATER','start');for(let j=0;j<6;j++)body+=line(33,32+j*16,56,2,'#555',.3)}
          else if(templateId==='facet-03'){body+=rr(0,0,100,20,0,'#F0E5F4',null);body+=txt(8,14,7,'#4A245D','PLUMLINE','start');body+=rr(8,29,23,96,0,accent,.9);for(let j=0;j<5;j++)body+=line(39,34+j*17,50,2,'#555',.3)}
          else if(templateId==='facet-04'){body+=rr(8,8,84,22,0,'#EDE5CF',null);body+=txt(12,22,7,'#5B4B21','FACET / 04','start');body+=rr(8,38,27,86,0,accent,.75);for(let j=0;j<5;j++)body+=line(42,42+j*16,48,3,'#555',.28)}
          else if(templateId==='duo-01'){body+=rr(0,0,38,141,0,'#F0E6E3',null);body+=txt(19,19,7,'#563B37','ROSEMERE','middle');for(let j=0;j<6;j++)body+=line(7,33+j*12,24,2,accent,.4);body+=txt(46,17,8,'#2A2520','JANE MOKOENA','start');for(let j=0;j<5;j++)body+=line(46,30+j*20,44,2,'#555',.3)}
          else if(templateId==='duo-02'){body+=rr(0,0,42,141,0,'#EEF2EA',null);body+=rr(8,9,26,26,13,accent,.8);body+=txt(21,26,9,'#fff','JM','middle');body+=txt(49,17,8,'#243022','WILLOWGREEN','start');for(let j=0;j<5;j++)body+=rr(49,29+j*20,41,4,1,accent,.2)}
          else if(templateId==='duo-03'){body+=rr(0,0,45,141,0,'#EDEBE6',null);body+=txt(22,17,7,'#3E3B35','WARMSTONE','middle');for(let j=0;j<5;j++)body+=line(8,31+j*14,29,2,accent,.35);body+=txt(52,17,8,'#2F2D29','JANE MOKOENA','start');for(let j=0;j<5;j++)body+=line(52,31+j*20,39,2,'#555',.3)}
          else if(templateId==='graphite-sidebar-01'){body+=rr(0,0,27,141,0,a,.92);body+=txt(13,18,5,'#fff','CV','middle');for(let j=0;j<7;j++)body+=line(6,32+j*12,14,2,'#fff',.32);body+=txt(33,16,8,'#1F282D','JANE MOKOENA','start');body+=line(33,22,58,2,a,.7);for(let j=0;j<5;j++)body+=line(33,34+j*19,51,3,'#444',.25)}
          else if(templateId==='ivory-editorial-sidebar-02'){body+=txt(8,15,4,a,'02','start');body+=txt(20,19,9,'#2C2926','JANE MOKOENA','start');body+=line(20,25,70,1,'#CFC4B8',.8);body+=rr(8,34,22,91,0,'#F0E8DC',null);for(let j=0;j<6;j++)body+=line(38,37+j*14,52,2,'#555',.28)}
          else if(templateId==='navy-vertical-rail-03'){body+=rr(0,0,23,141,0,a,.95);body+=txt(11.5,15,7,'#fff','03','middle');for(let j=0;j<7;j++)body+=line(6,37+j*12,12,2,'#fff',.3);body+=txt(29,16,8,'#22344A','JANE MOKOENA','start');line(29,23,62,2,a,.6);for(let j=0;j<5;j++)body+=line(29,37+j*18,57,3,'#555',.25)}
          else if(templateId==='burgundy-two-page-04'){body+=rr(7,8,86,24,0,'#F3E4E6',null);body+=txt(11,23,8,'#66323E','HERITAGE','start');body+=rr(7,39,25,83,0,'#E9D1D6',null);for(let j=0;j<5;j++)body+=line(38,43+j*16,53,2,a,.32);body+=txt(11,16,4,a,'04','start')}
          else if(templateId==='forest-profile-sidebar-05'){body+=rr(0,0,100,23,0,a,null);body+=txt(7,15,7,'#fff','FIELD + OFFICE','start');body+=rr(7,31,22,92,0,'#DCE8D8',null);for(let j=0;j<6;j++)body+=line(35,35+j*14,55,2,'#52644F',.3);body+=txt(35,18,7,'#233B29','JANE MOKOENA','start')}
          else if(templateId==='black-copper-executive-06'){body+=rr(0,0,100,27,0,'#171717',null);body+=rr(69,0,31,27,0,a,.9);body+=txt(8,15,7,'#fff','EXECUTIVE','start');for(let j=0;j<5;j++)body+=line(8,39+j*18,84,3,'#555',.25)}
          else if(templateId==='slate-portfolio-07'){body+=rr(8,8,20,20,3,a,.25);body+=txt(18,22,6,'#344351','SP','middle');body+=txt(34,18,8,'#27343E','JANE MOKOENA','start');body+=line(34,24,52,1,a,.7);for(let j=0;j<4;j++){body+=rr(8,36+j*22,84,15,2,'#fff',1);body+=line(12,42+j*22,52,2,'#596674',.3)}}
          else if(templateId==='sand-modern-two-page-08'){body+=rr(0,0,100,10,0,a,null);body+=txt(8,24,9,'#4A4038','JANE MOKOENA','start');body+=line(8,29,84,1,'#C8B8A5',.8);body+=rr(8,39,21,83,0,'#E9E0D4',null);for(let j=0;j<5;j++)body+=line(35,43+j*16,55,3,'#665A50',.25)}
          else if(templateId==='indigo-cards-09'){body+=txt(8,16,4,a,'PROFILE 09','start');body+=txt(8,27,10,'#25243B','JANE','start');body+=txt(8,36,10,'#25243B','MOKOENA','start');for(let j=0;j<5;j++){body+=rr(39,28+j*20,52,15,2,'#fff',1);body+=line(43,34+j*20,38,2,a,.3)}}
          else if(templateId==='teal-command-two-page-10'){body+=rr(0,0,100,18,0,a,null);body+=txt(8,13,5,'#fff','COMMAND / 10','start');body+=txt(8,29,9,'#204E4B','JANE MOKOENA','start');body+=rr(8,39,25,83,0,'#DCEDEA',null);for(let j=0;j<5;j++)body+=line(39,43+j*16,53,3,'#526A68',.24)}
          else if(templateId==='executive-01'){body+=rr(0,0,100,31,0,'#1B2A4A',null);body+=txt(8,12,3.5,'#C9D5E6','EXECUTIVE PROFILE','start');body+=txt(8,24,8,'#FFFFFF','JANE MOKOENA','start');body+=txt(8,28,3.4,'#B8C9DF','EXECUTIVE LEADER','start');body+=line(70,38,22,2,'#C9A84C',.8);body+=line(8,46,84,2,'#526276',.2);for(let j=0;j<4;j++){body+=rr(8,54+j*16,54,12,1,'#FFFFFF',1);body+=line(12,59+j*16,39,2,'#1B2A4A',.28)}body+=rr(67,54,25,54,1,'#EEF1F5',1);for(let j=0;j<4;j++)body+=line(71,60+j*10,16,2,'#1B2A4A',.26)}
          return `<svg viewBox="0 0 100 141" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
        }
        // Never return the old blank fallback. Remaining templates receive a
        // deterministic, populated CV thumbnail based on their identity.
        body = generateLegacyThumbnailSVG(templateId, a);
        return `<svg viewBox="0 0 100 141" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
    }

    const SVGS = {};
    allTemplateIds.forEach(id => { SVGS[id] = generateThumbnailSVG(id); });


   function renderTemplateContent(data, tid) {
    const definition = typeof getTemplateDefinition === 'function'
        ? getTemplateDefinition(tid)
        : null;
    let html;

    if (definition?.templateMarkup) html = renderTemplateMarkup(data, definition.templateMarkup);
    else if (tid === 'executive-02')       html = renderExecutive02(data);
    else if (tid.startsWith('modern'))     html = renderModern(data, tid);
    else if (tid.startsWith('ats'))       html = renderAts(data, tid);
    else if (tid.startsWith('executive')) html = renderExecutive(data, tid);
    else if (tid.startsWith('creative'))  html = renderCreative(data);
    else if (tid.startsWith('split'))     html = renderSplit(data, tid);
    else if (tid.startsWith('timeline'))  html = renderTimeline(data, tid);
    else if (tid.startsWith('starter'))   html = renderStarter(data, tid);
    else if (tid.startsWith('combined'))  html = renderCombined(data, tid);
    else if (tid.startsWith('practical'))html = renderPractical(data, tid);
    else if (tid.startsWith('functional'))html = renderFunctional(data, tid);
    else if (tid.startsWith('trade'))     html = renderTrade(data, tid);
    else if (tid.startsWith('mono'))      html = renderMonogram(data, tid);
    else if (tid.startsWith('facet'))     html = renderFacet(data, tid);
    else if (tid.startsWith('duo'))       html = renderDuotone(data, tid);
    else html = renderModern(data, tid);

    return enforceSectionCoverage(data, tid, html);
}

function getVisibleSections(data) {
    return (data?.sections || [])
        .filter(section => section && section.visible !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function sectionRegionType(type) {
    return SIDEBAR_TYPES.has(type) ? 'sidebar' : 'main';
}

function sectionFallbackSelectors(region) {
    if (region === 'sidebar') {
        return [
            '.sidebar',
            '.facet-sidebar',
            '.duo-sidebar',
            '.split-rail',
            '[data-role="sidebar"]'
        ];
    }
    return [
        '.main',
        '.facet-main',
        '.duo-main',
        '[data-role="main"]'
    ];
}

function locateFallbackRegion(doc, region) {
    for (const selector of sectionFallbackSelectors(region)) {
        const found = doc.querySelector(selector);
        if (found) return found;
    }
    return doc.body || doc;
}

function createFallbackSection(section) {
    const region = sectionRegionType(section.type);
    const wrapperClass = region === 'sidebar' ? 'side-section' : 'main-section';
    const labelClass = region === 'sidebar' ? 'side-label' : 'main-label';
    const renderer = SR[section.type];
    let inner = '';

    if (typeof renderer === 'function') {
        const raw = renderer(section);
        const holder = document.createElement('div');
        holder.innerHTML = raw || '';
        const marked = holder.querySelector('[data-rf-section-type]');
        if (marked) return marked.outerHTML;
        inner = holder.innerHTML;
    }

    if (!inner) inner = generateSectionItems(section);

    return `<section class="${wrapperClass} rf-fallback-section" data-rf-section-type="${escHtml(section.type)}"><p class="${labelClass}">${escHtml(section.title || humanType(section.type))}</p>${inner || '<p class="empty-note">None added.</p>'}</section>`;
}

function enforceSectionCoverage(data, templateId, html) {
    const visible = getVisibleSections(data);
    if (!visible.length || !html) return html;

    const doc = document.createElement('div');
    doc.innerHTML = html;

    const rendered = new Set(
        Array.from(doc.querySelectorAll('[data-rf-section-type]'))
            .map(node => node.getAttribute('data-rf-section-type'))
            .filter(Boolean)
    );

    // Some art-directed templates have bespoke section markup instead of the
    // shared SR wrappers - either a different heading class, or (renderMonogram,
    // and the bare "<p class=...-sec-title>...</p>content" fragments used by
    // renderFunctional/renderPractical/renderTrade) no wrapping container
    // element at all. Infer those existing sections from their visible title
    // and mark them rather than duplicating them in the fallback.
    const titleNodes = Array.from(doc.querySelectorAll(
        '.main-label, .side-label, .combined-sec-title, .starter-sec-title, .mono-kicker, .practical-sec-title, .functional-sec-title, .trade-sec-title'
    ));
    for (const section of visible) {
        if (rendered.has(section.type)) continue;
        const title = String(section.title || '').trim();
        if (!title) continue;
        const match = titleNodes.find(node =>
            !node.hasAttribute('data-rf-matched') && node.textContent.trim() === title
        );
        if (match) {
            match.setAttribute('data-rf-matched', 'true');
            // No recognized wrapping container (bare heading + content with
            // nothing enclosing them) - tag the heading node itself instead
            // of leaving the section unmarked. Any tagged element satisfies
            // the coverage check below; it doesn't have to be a container.
            const container = match.closest(
                '[data-rf-section-type], .main-section, .side-section, .combined-entry, .split-rail-block'
            ) || match;
            if (!container.hasAttribute('data-rf-section-type')) {
                container.setAttribute('data-rf-section-type', section.type);
                rendered.add(section.type);
            }
        }
    }

    const missing = visible.filter(section => !rendered.has(section.type));
    doc.querySelectorAll('[data-rf-matched]').forEach(node => node.removeAttribute('data-rf-matched'));
    if (!missing.length) return doc.innerHTML;

    const byRegion = {
        sidebar: missing.filter(section => sectionRegionType(section.type) === 'sidebar'),
        main: missing.filter(section => sectionRegionType(section.type) === 'main')
    };

    for (const [region, sections] of Object.entries(byRegion)) {
        if (!sections.length) continue;
        const target = locateFallbackRegion(doc, region);
        const fragment = document.createDocumentFragment();
        const holder = document.createElement('div');

        for (const section of sections) {
            holder.innerHTML = createFallbackSection(section);
            while (holder.firstElementChild) {
                fragment.appendChild(holder.firstElementChild);
            }
        }

        target.appendChild(fragment);
    }

    console.warn(
        `[ResumeRenderer] ${templateId} omitted visible sections; fallback renderer inserted them:`,
        missing.map(section => section.type)
    );

    return doc.innerHTML;
}

function renderTemplateMarkup(data, raw) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = raw;
    const p = data.personalDetails || {};
    const vis = (data.sections || [])
        .filter(s => s.visible !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    wrapper.querySelectorAll('[data-bind]').forEach(el => {
        const value = getP(data, el.getAttribute('data-bind'));
        el.textContent = value || '';
    });
    wrapper.querySelectorAll('[data-bind-src]').forEach(el => {
        const value = getP(data, el.getAttribute('data-bind-src'));
        if (value) {
            el.setAttribute('src', value);
            el.hidden = false;
        } else {
            el.removeAttribute('src');
            el.hidden = true;
        }
    });
    wrapper.querySelectorAll('[data-role="contact"]').forEach(el => {
        el.innerHTML = contactListHtml(p);
    });
    wrapper.querySelectorAll('[data-role="sidebar"]').forEach(el => {
        el.innerHTML = vis
            .filter(section => SIDEBAR_TYPES.has(section.type))
            .map(section => SR[section.type] ? SR[section.type](section) : '')
            .join('');
    });
    wrapper.querySelectorAll('[data-role="main"]').forEach(el => {
        el.innerHTML = vis
            .filter(section => MAIN_TYPES.has(section.type))
            .map(section => SR[section.type] ? SR[section.type](section) : '')
            .join('');
    });
    wrapper.querySelectorAll('[data-page-number]').forEach(el => {
        el.textContent = String(data.__rfPageNumber || 1);
    });
    return wrapper.innerHTML;
}


const SIDEBAR_TEMPLATE_IDS = new Set(
    TEMPLATE_DEFINITIONS.filter(def => def.layout === 'two-column').map(def => def.id)
);

    function wrapMain(title,inner,type=""){ return `<section class="main-section" data-rf-section-type="${escHtml(type)}"><p class="main-label">${escHtml(title)}</p>${inner||`<p class="empty-note">No entries yet.</p>`}</section>`; }
    function wrapSide(title,inner,type=""){ return `<section class="side-section" data-rf-section-type="${escHtml(type)}"><p class="side-label">${escHtml(title)}</p>${inner||`<p class="empty-note">None added.</p>`}</section>`; }

    const SR = {
        experience(s){ const h=s.items.map(it=>`<div class="entry"><div class="entry-header"><div><p class="entry-title">${escHtml(it.role)}</p><p class="entry-sub">${escHtml(it.company)}${it.location?` · ${escHtml(it.location)}`:""}</p></div><span class="entry-date">${fmtDate(it.startDate,it.endDate,it.current)}</span></div>${it.bullets&&it.bullets.length?`<ul>${it.bullets.map(b=>`<li>${escHtml(b)}</li>`).join("")}</ul>`:""}</div>`).join(""); return wrapMain(s.title,h,s.type); },
        education(s){ const h=s.items.map(it=>`<div class="entry"><div class="entry-header"><div><p class="entry-title">${escHtml(it.qualification)}</p><p class="entry-sub">${escHtml(it.institution)}${it.location?` · ${escHtml(it.location)}`:""}</p></div><span class="entry-date">${fmtDate(it.startDate,it.endDate,it.current)}</span></div>${it.notes?`<ul><li>${escHtml(it.notes)}</li></ul>`:""}</div>`).join(""); return wrapMain(s.title,h,s.type); },
        projects(s){ const h=s.items.map(it=>`<div class="entry"><div class="entry-header"><div><p class="entry-title">${escHtml(it.name)}</p></div><span class="entry-date">${it.bullets&&it.bullets.length?`<ul>${it.bullets.map(b=>`<li>${escHtml(b)}</li>`).join("")}</ul>`:""}</div>`).join(""); return wrapMain(s.title,h,s.type); },
        custom(s){ const h=s.items.map(it=>`<div class="entry"><p class="entry-title">${escHtml(it.title||"")}</p>${it.bullets&&it.bullets.length?`<ul>${it.bullets.map(b=>`<li>${escHtml(b)}</li>`).join("")}</ul>`:""}</div>`).join(""); return wrapMain(s.title,h,s.type); },
        "personal-info"(s){ const h=s.items.map(it=>`<div class="side-item">${escHtml(it.label)}: <span class="meta">${escHtml(it.value)}</span></div>`).join(""); return wrapSide(s.title,h,s.type); },
        skills(s){ return wrapSide(s.title,s.items.map(it=>`<span class="skill-tag">${escHtml(it.name)}</span>`).join(""),s.type); },
        languages(s){ return wrapSide(s.title,s.items.map(it=>`<div class="side-item">${escHtml(it.name)} <span class="meta">— ${escHtml(it.level)}</span></div>`).join(""),s.type); },
        certificates(s){ return wrapSide(s.title,s.items.map(it=>`<div class="side-item">${escHtml(it.name)}</div>`).join(""),s.type); },
        references(s){ const h=s.items.map(it=>{
            const phoneLine = it.phone ? `<div class="ref-contact-line"><span class="icon-inline" style="color:var(--color-accent)">${icoSVG("phone")}</span><span>${escHtml(it.phone)}</span></div>` : "";
            const emailLine = it.email ? `<div class="ref-contact-line"><span class="icon-inline" style="color:var(--color-accent)">${icoSVG("email")}</span><span>${escHtml(it.email)}</span></div>` : "";
            return `<div class="ref-item"><div class="ref-name">${escHtml(it.name)}</div><div class="ref-details">${escHtml(it.title)}</div><div class="ref-contact">${phoneLine}${emailLine}</div></div>`;
        }).join(""); return wrapSide(s.title,h,s.type); },
        interests(s){ const line=s.items.map(it=>escHtml(it.value)).join(" · "); return wrapSide(s.title,line?`<p class="side-item" style="line-height:1.5">${line}</p>`:"",s.type); },
        strengths(s){ const chips=s.items.filter(it=>it.value&&it.value.trim()).map(it=>`<span class="strength-chip">${escHtml(it.value)}</span>`).join(""); return wrapSide(s.title,chips?`<div class="strengths-row">${chips}</div>`:"",s.type); }
    };

    function contactListHtml(p){ const items=[{icon:"email",val:p.email},{icon:"phone",val:p.phone},{icon:"location",val:p.location},...(p.links||[]).map(l=>({icon:"link",val:l.url,label:l.label}))]; return items.filter(i=>i.val).map(i=>`<li><span class="icon-inline">${icoSVG(i.icon)}</span>${i.label?`<a href="${escHtml(i.val)}">${escHtml(i.label)}</a>`:escHtml(i.val)}</li>`).join(""); }
    function atsContactLine(p){ const items=[{icon:"email",val:p.email},{icon:"phone",val:p.phone},{icon:"location",val:p.location},...(p.links||[]).map(l=>({icon:"link",val:l.url}))]; return items.filter(i=>i.val).map(i=>`<span class="contact-inline-item"><span class="icon-inline">${icoSVG(i.icon)}</span>${escHtml(i.val)}</span>`).join('<span class="contact-inline-item" style="opacity:.4">|</span>'); }
    function photoHtml(p){ if(!p||!p.photo)return ""; return `<div class="cv-photo"><img src="${p.photo}" alt="Photo"></div>`; }
    function atsStrengthsBlock(s){ const chips=s.items.filter(it=>it.value&&it.value.trim()).map(it=>`<span class="strength-chip">${escHtml(it.value)}</span>`).join(""); return wrapMain(s.title,chips?`<div class="strengths-row">${chips}</div>`:"",s.type); }
    function atsPersonalInfoBlock(s){ const line=s.items.map(it=>`${escHtml(it.label)}: ${escHtml(it.value)}`).join(" &nbsp;·&nbsp; "); return wrapMain(s.title,line?`<p class="ats-plain-list">${line}</p>`:"",s.type); }
    function atsPlainList(s,fmt){ const line=s.items.map(fmt).join(", "); return wrapMain(s.title,line?`<p class="ats-plain-list">${line}</p>`:"",s.type); }
    function elegantAvailGrid(s){ if(!s.items.length)return`<p class="empty-note">None added.</p>`; return `<div class="elegant-avail-grid">${s.items.map(it=>`<div class="elegant-avail-item"><span class="av-dot"></span><span class="av-lbl">${escHtml(it.label)}:</span><span class="av-val">${escHtml(it.value)}</span></div>`).join("")}</div>`; }

    function renderPersonalInfoAfterSummary(sections, tid) {
        if (SIDEBAR_TEMPLATE_IDS.has(tid)) return '';
        const pi = sections.find(s => s.type==="personal-info" && s.visible);
        if (!pi || !pi.items.length) return "";
        return atsPersonalInfoBlock(pi);
    }

    function renderModern(data, tid) {
        const p=data.personalDetails;
        const vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);
        const sideHtml=vis.filter(s=>SIDEBAR_TYPES.has(s.type)).map(s=>SR[s.type]?SR[s.type](s):"").join("");
        const mainHtml=vis.filter(s=>MAIN_TYPES.has(s.type)).map(s=>SR[s.type]?SR[s.type](s):"").join("");
        if (tid==="modern-03") {
            // modern-03 is single-column: it has no sidebar to catch SIDEBAR_TYPES
            // sections, so unlike the two-column branch below it must render every
            // non-personal-info section itself instead of only MAIN_TYPES.
            const allHtml = vis.filter(s=>s.type!=="personal-info").map(s=>SR[s.type]?SR[s.type](s):"").join("");
            return `<div class="modern-header"><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><div class="ats-contact-line">${atsContactLine(p)}</div></div><div class="main"><p class="summary">${escHtml(p.summary)}</p>${renderPersonalInfoAfterSummary(vis,tid)}${allHtml}</div>`;
        }
        return `<div class="sidebar">${photoHtml(p)}<p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><ul class="contact-list">${contactListHtml(p)}</ul>${sideHtml}</div><div class="main"><p class="summary">${escHtml(p.summary)}</p>${renderPersonalInfoAfterSummary(vis,tid)}${mainHtml}</div>`;
    }
    function renderAts(data, tid) {
        const p=data.personalDetails;
        const vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);
        let hdr;
        if(tid==="ats-02"){ const cRight=[{icon:"email",val:p.email},{icon:"phone",val:p.phone},{icon:"location",val:p.location},...(p.links||[]).map(l=>({icon:"link",val:l.url}))]; hdr=`<div class="ats-header-row"><div><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p></div><div class="contact-block">${cRight.filter(i=>i.val).map(i=>`<div class="contact-inline-item"><span class="icon-inline">${icoSVG(i.icon)}</span>${escHtml(i.val)}</div>`).join("")}</div></div><hr class="ats-rule">`; }
        else { hdr=`<div class="ats-header"><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><div class="ats-contact-line">${atsContactLine(p)}</div></div><hr class="ats-rule">`; }
        const secsHtml=vis.filter(s=>s.type!=="personal-info").map(s=>{ if(s.type==="skills")return atsPlainList(s,it=>escHtml(it.name)); if(s.type==="languages")return atsPlainList(s,it=>`${escHtml(it.name)} (${escHtml(it.level)})`); if(s.type==="certificates")return atsPlainList(s,it=>escHtml(it.name)); if(s.type==="strengths")return atsStrengthsBlock(s); return SR[s.type]?SR[s.type](s):""; }).join("");
        return `<div class="main">${hdr}<p class="summary">${escHtml(p.summary)}</p>${renderPersonalInfoAfterSummary(vis,tid)}${secsHtml}</div>`;
    }
    function renderExecutive(data, tid) {
        const p=data.personalDetails;
        const vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);
        const secsHtml=vis.filter(s=>s.type!=="personal-info").map(s=>{ if(["skills","languages","certificates"].includes(s.type))return atsPlainList(s,it=>`${escHtml(it.name)}${it.level?` (${escHtml(it.level)})`:""}`); if(s.type==="strengths")return atsStrengthsBlock(s); return SR[s.type]?SR[s.type](s):""; }).join("");
        return `<div class="exec-header"><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><div class="exec-rule"></div><div class="ats-contact-line exec-contact-line">${atsContactLine(p)}</div></div><div class="main"><p class="summary">${escHtml(p.summary)}</p>${renderPersonalInfoAfterSummary(vis,tid)}${secsHtml}</div>`;
    }
    function renderExecutive02(data) {
        const p=data.personalDetails;
        const vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);
        const sideHtml=vis.filter(s=>SIDEBAR_TYPES.has(s.type)).map(s=>SR[s.type]?SR[s.type](s):"").join("");
        const mainHtml=vis.filter(s=>MAIN_TYPES.has(s.type)).map(s=>SR[s.type]?SR[s.type](s):"").join("");
        return `<div class="sidebar">${photoHtml(p)}<p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><ul class="contact-list">${contactListHtml(p)}</ul>${sideHtml}</div><div class="main"><p class="summary">${escHtml(p.summary)}</p>${renderPersonalInfoAfterSummary(vis,'executive-02')}${mainHtml}</div>`;
    }
    function renderCreative(data) {
        const p=data.personalDetails, vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);
        const sideHtml=vis.filter(s=>SIDEBAR_TYPES.has(s.type)).map(s=>SR[s.type]?SR[s.type](s):"").join("");
        const mainHtml=vis.filter(s=>MAIN_TYPES.has(s.type)).map(s=>SR[s.type]?SR[s.type](s):"").join("");
        const cLine=[{icon:"email",val:p.email},{icon:"phone",val:p.phone},{icon:"location",val:p.location},...(p.links||[]).map(l=>({icon:"link",val:l.url}))];
        const cHtml=cLine.filter(i=>i.val).map(i=>`<span class="contact-inline-item"><span class="icon-inline">${icoSVG(i.icon)}</span>${escHtml(i.val)}</span>`).join('<span style="opacity:.5;margin:0 5px">·</span>');
        return `<div class="creative-band"><p class="creative-name">${escHtml(p.fullName)}</p><p class="creative-title">${escHtml(p.jobTitle)}</p><div class="creative-contact">${cHtml}</div></div><div class="sidebar">${sideHtml}</div><div class="main"><p class="summary">${escHtml(p.summary)}</p>${renderPersonalInfoAfterSummary(vis,'creative-01')}${mainHtml}</div>`;
    }
    function renderSplit(data, tid) {
        const p=data.personalDetails, vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);
        const mainSecs=vis.filter(s=>MAIN_TYPES.has(s.type));
        const railSecs=vis.filter(s=>SIDEBAR_TYPES.has(s.type)&&s.type!=="personal-info");
        const mainHtml=mainSecs.map(s=>{const inner=SR[s.type]?SR[s.type](s):"";return `<div class="split-card">${inner}</div>`;}).join("");
        const railHtml=railSecs.map(s=>{
            let ih="";
            if(s.type==="skills")ih=s.items.map(it=>`<div class="split-rail-item"><span class="dot"></span>${escHtml(it.name)}</div>`).join("");
            else if(s.type==="languages")ih=s.items.map(it=>`<div class="split-rail-item"><span class="dot"></span>${escHtml(it.name)} — ${escHtml(it.level)}</div>`).join("");
            else if(s.type==="certificates")ih=s.items.map(it=>`<div class="split-rail-item"><span class="dot"></span>${escHtml(it.name)}</div>`).join("");
            else if(s.type==="references")ih=s.items.map(it=>`<div class="split-rail-item"><span class="dot"></span>${escHtml(it.name)}${it.title?` — ${escHtml(it.title)}`:""}</div>`).join("");
            else if(s.type==="projects")ih=s.items.map(it=>`<div class="split-rail-item"><span class="dot"></span>${escHtml(it.name)}</div>`).join("");
            else if(s.type==="custom")ih=s.items.map(it=>`<div class="split-rail-item"><span class="dot"></span>${escHtml(it.title||"")}</div>`).join("");
            else if(s.type==="strengths")ih=s.items.filter(it=>it.value&&it.value.trim()).map(it=>`<div class="split-rail-item"><span class="dot"></span>${escHtml(it.value)}</div>`).join("");
            else ih=s.items.map(it=>`<div class="split-rail-item"><span class="dot"></span>${escHtml(it.value||it.name)}</div>`).join("");
            return `<div class="split-rail-block"><p class="side-label">${escHtml(s.title)}</p>${ih||`<p class="empty-note">None added.</p>`}</div>`;
        }).join("");
        const frame=tid==='split-01'?'split-ledger':tid==='split-02'?'split-bracket':tid==='split-03'?'split-corner':'split-frame';
        const intro = tid==='split-03'
            ? `<div class="split-header split-header-corner" data-rf-region="header"><div><p class="job-title">${escHtml(p.jobTitle)}</p><p class="name">${escHtml(p.fullName)}</p></div><div class="split-contact-row">${atsContactLine(p)}</div></div>`
            : tid==='split-04'
            ? `<div class="split-header split-header-frame" data-rf-region="header"><div class="nameblock"><p class="eyebrow">PROFESSIONAL PROFILE</p><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p></div><div class="split-contact-row">${atsContactLine(p)}</div></div>`
            : `<div class="split-header" data-rf-region="header"><div><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p></div><div class="split-contact-row">${atsContactLine(p)}</div></div>`;
        return `<div class="split-shell ${frame}"><div class="main"><div class="ledger-header-zone">${intro}</div><hr class="split-rule"><p class="summary">${escHtml(p.summary)}</p>${renderPersonalInfoAfterSummary(vis,tid)}${mainHtml}</div><div class="sidebar">${railHtml}</div></div>`;
    }
    function renderTimeline(data, tid) {
        const p=data.personalDetails, vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);
        const secsHtml=vis.filter(s=>s.type!=="personal-info").map(s=>{ if(s.type==="skills")return atsPlainList(s,it=>escHtml(it.name)); if(s.type==="languages")return atsPlainList(s,it=>`${escHtml(it.name)} (${escHtml(it.level)})`); if(s.type==="certificates")return atsPlainList(s,it=>escHtml(it.name)); if(s.type==="strengths")return atsStrengthsBlock(s); return SR[s.type]?SR[s.type](s):""; }).join("");
        const cls=tid==='timeline-01'?'timeline-pathway':tid==='timeline-02'?'timeline-milestone':'timeline-journey';
        const head=tid==='timeline-02'
          ? `<div class="tl-mast"><span class="tl-index">CV</span><div><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p></div><div class="ats-contact-line">${atsContactLine(p)}</div></div>`
          : tid==='timeline-03'
          ? `<div class="tl-mast tl-mast-journey"><div><p class="eyebrow">CAREER JOURNEY</p><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p></div><div class="ats-contact-line">${atsContactLine(p)}</div></div>`
          : `<div class="tl-mast" data-rf-region="header"><div><p class="eyebrow">CAREER PATH</p><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p></div><div class="ats-contact-line">${atsContactLine(p)}</div></div>`;
        return `<div class="main ${cls}">${head}<hr class="tl-rule"><p class="summary">${escHtml(p.summary)}</p>${renderPersonalInfoAfterSummary(vis,tid)}${secsHtml}</div>`;
    }
    const SKILL_LEVEL_PCT={"Beginner":35,"Basic":35,"Intermediate":60,"Proficient":75,"Advanced":90,"Expert":95,"Native":100,"Fluent":95,"Conversational":65};
    function renderStarter(data) {
        const p=data.personalDetails, vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);
        const strengthsSec=vis.find(s=>s.type==="strengths");
        const strengthsHtml=strengthsSec&&strengthsSec.items.some(it=>it.value&&it.value.trim())?`<section class="main-section" data-rf-section-type="strengths"><div class="strengths-row">${strengthsSec.items.filter(it=>it.value&&it.value.trim()).map(it=>`<span class="strength-chip">${escHtml(it.value)}</span>`).join("")}</div></section>`:"";
        const skillsSec=vis.find(s=>s.type==="skills");
        const skillsHtml=skillsSec?`<div class="main-section"><p class="starter-sec-title">${escHtml(skillsSec.title)}</p>${skillsSec.items.length?skillsSec.items.map(it=>{const pct=SKILL_LEVEL_PCT[it.level]||55;return`<div class="skillbar-row"><div class="skillbar-lbl">${escHtml(it.name)}</div><div class="skillbar-track"><div class="skillbar-fill" style="width:${pct}%"></div></div><span class="skillbar-pct">${pct}%</span></div>`;}).join(""):`<p class="empty-note">None added.</p>`}</div>`:"";
        
        const restSecs = vis.filter(
    s => s !== strengthsSec &&
         s.type !== "skills" &&
         s.type !== "experience" &&
         s.type !== "personal-info"
);
        const restHtml=restSecs.map(s=>{const inner=SR[s.type]?SR[s.type](s):"";return `<div class="main-section"><p class="starter-sec-title">${escHtml(s.title)}</p>${inner.replace(/<p class="(main|side)-label">.*?<\/p>/,"")}</div>`;}).join("");
        const photoEl=p.photo?`<div class="starter-photo"><img src="${p.photo}" alt="Photo"></div>`:'';
        return `<div class="starter-header">${photoEl}<div><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p></div></div><div class="starter-contact-row">${atsContactLine(p)}</div><div class="main"><p class="summary">${escHtml(p.summary)}</p>${strengthsHtml}${skillsHtml}${restHtml}</div>`;
    }
    function renderCombined(data) {
        const p=data.personalDetails, vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);
        const SRC=new Set(["experience","projects","custom"]);
        const entries=[];
        vis.filter(s=>SRC.has(s.type)).forEach(s=>{
            s.items.forEach(it=>{
                if(s.type==="experience")entries.push({sourceType:s.type,tag:"Job",title:it.role,sub:[it.company,it.location].filter(Boolean).join(" · "),start:it.startDate,end:it.endDate,current:it.current,bullets:it.bullets||[]});
                else if(s.type==="projects")entries.push({sourceType:s.type,tag:"Project",title:it.name,sub:it.url||"",start:it.startDate,end:it.endDate,current:false,bullets:it.bullets||[]});
                else entries.push({sourceType:s.type,tag:s.title||"Activity",title:it.title||s.title,sub:"",start:"",end:"",current:false,bullets:it.bullets||[]});
            });
        });
        entries.sort((a,b)=>{if(a.current&&!b.current)return -1;if(b.current&&!a.current)return 1;return(b.start||"").localeCompare(a.start||"");});
        const entriesHtml=entries.map(e=>`<div class="combined-entry" data-rf-section-type="${escHtml(e.sourceType)}"><span class="combined-tag">${escHtml(e.tag)}</span><p class="entry-title">${escHtml(e.title||"")}</p>${e.sub?`<p class="entry-sub">${escHtml(e.sub)}</p>`:""}${e.start?`<span class="entry-date">${fmtDate(e.start,e.end,e.current)}</span>`:""}${e.bullets.length?`<ul>${e.bullets.map(b=>`<li>${escHtml(b)}</li>`).join("")}</ul>`:""}</div>`).join("");
        const otherSecs=vis.filter(s=>!SRC.has(s.type)&&s.type!=="personal-info");
        const otherHtml=otherSecs.map(s=>{
            if(s.type==="skills")return `<p class="combined-sec-title">${escHtml(s.title)}</p><div class="combined-plain-chips">${s.items.length?s.items.map(it=>`<span class="strength-chip">${escHtml(it.name)}</span>`).join(""):`<p class="empty-note">None added.</p>`}</div>`;
            if(s.type==="strengths"){const vals=s.items.filter(it=>it.value&&it.value.trim());return `<p class="combined-sec-title">${escHtml(s.title)}</p><div class="combined-plain-chips">${vals.length?vals.map(it=>`<span class="strength-chip">${escHtml(it.value)}</span>`).join(""):`<p class="empty-note">None added.</p>`}</div>`;}
            if(s.type==="languages")return `<p class="combined-sec-title">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length?s.items.map(it=>`${escHtml(it.name)} (${escHtml(it.level)})`).join(", "):`<span class="empty-note">None added.</span>`}</p>`;
            if(s.type==="certificates")return `<p class="combined-sec-title">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length?s.items.map(it=>escHtml(it.name)).join(", "):`<span class="empty-note">None added.</span>`}</p>`;
            const inner=SR[s.type]?SR[s.type](s):"";
            return `<p class="combined-sec-title">${escHtml(s.title)}</p>${inner.replace(/<p class="(main|side)-label">.*?<\/p>/,"")}`;
        }).join("");
        return `<div class="main"><div class="combined-header"><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><div class="combined-contact-row">${atsContactLine(p)}</div></div><p class="summary">${escHtml(p.summary)}</p>${renderPersonalInfoAfterSummary(vis,'combined')}${entriesHtml.length?`<p class="combined-sec-title">What I've Been Doing</p>${entriesHtml}`:""}${otherHtml}</div>`;
    }
    function renderPractical(data, tid) {
        const p=data.personalDetails, vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);

        if (tid === "practical-02") {
            const sideTypes = new Set(["skills","languages","certificates","references","interests","strengths","personal-info","projects","custom"]);
            const sideSecs = vis.filter(s => sideTypes.has(s.type));
            const mainSecs = vis.filter(s => s.type === "experience" || s.type === "education");
            const sideHtml = sideSecs.map(s => {
                if (s.type === "personal-info") return `<div class="side-section"><p class="side-label">${escHtml(s.title)}</p>${elegantAvailGrid(s)}</div>`;
                if (s.type === "skills" || s.type === "strengths") { const vals = s.type === "skills" ? s.items.map(it => it.name) : s.items.filter(it => it.value && it.value.trim()).map(it => it.value); return `<div class="side-section"><p class="side-label">${escHtml(s.title)}</p><div class="practical-plain-chips">${vals.length ? vals.map(v => `<span class="strength-chip">${escHtml(v)}</span>`).join("") : `<p class="empty-note">None added.</p>`}</div></div>`; }
                if (s.type === "languages") return `<div class="side-section"><p class="side-label">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length ? s.items.map(it => `${escHtml(it.name)} (${escHtml(it.level)})`).join(", ") : `<span class="empty-note">None added.</span>`}</p></div>`;
                if (s.type === "certificates") return `<div class="side-section"><p class="side-label">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length ? s.items.map(it => escHtml(it.name)).join(", ") : `<span class="empty-note">None added.</span>`}</p></div>`;
                if (s.type === "interests") return `<div class="side-section"><p class="side-label">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length ? s.items.map(it => escHtml(it.value)).join(" · ") : `<span class="empty-note">None added.</span>`}</p></div>`;
                if (s.type === "references") return `<div class="side-section"><p class="side-label">${escHtml(s.title)}</p>${s.items.length ? s.items.map(it => `<div class="side-item">${escHtml(it.name)}<br><span class="meta">${escHtml(it.title)}</span></div>`).join("") : `<p class="empty-note">None added.</p>`}</div>`;
                if (s.type === "projects") return `<div class="side-section"><p class="side-label">${escHtml(s.title)}</p>${s.items.length ? s.items.map(it => `<div class="side-item">${escHtml(it.name)}</div>`).join("") : `<p class="empty-note">None added.</p>`}</div>`;
                if (s.type === "custom") return `<div class="side-section"><p class="side-label">${escHtml(s.title)}</p>${s.items.length ? s.items.map(it => `<div class="side-item">${escHtml(it.title || "")}</div>`).join("") : `<p class="empty-note">None added.</p>`}</div>`;
                return "";
            }).join("");
            const mainHtml2 = mainSecs.map(s => {
                if (s.type === "experience") return `<p class="practical-sec-title">${escHtml(s.title)}</p>${s.items.length ? s.items.map(it => `<div class="practical-entry"><p class="entry-title">${escHtml(it.role)}</p><p class="entry-sub">${escHtml(it.company)}${it.location ? ` · ${escHtml(it.location)}` : ""} — ${fmtDate(it.startDate, it.endDate, it.current)}</p>${it.bullets && it.bullets.length ? `<ul>${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`).join("") : `<p class="empty-note">No entries yet.</p>`}`;
                if (s.type === "education") { const inner = SR.education(s); return `<p class="practical-sec-title">${escHtml(s.title)}</p>${inner.replace(/<p class="(main|side)-label">.*?<\/p>/, "")}`; }
                return "";
            }).join("");
            return `<div class="prac2-sidebar">${sideHtml}</div><div class="main"><div class="practical-header"><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><div class="practical-contact-row">${atsContactLine(p)}</div></div><hr class="practical-rule"><p class="summary">${escHtml(p.summary)}</p>${mainHtml2}</div>`;
        }

        const availSec=vis.find(s=>s.type==="personal-info");
        const availHtml=availSec?`<p class="practical-sec-title">${escHtml(availSec.title)}</p>${availSec.items.length?`<div class="avail-grid">${availSec.items.map(it=>`<div class="avail-item"><div class="avail-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><div class="avail-text"><span class="avail-label">${escHtml(it.label)}</span><span class="avail-value">${escHtml(it.value)}</span></div></div>`).join("")}</div>`:`<p class="empty-note">None added.</p>`}`:"";
        const restSecs=vis.filter(s=>s.type!=="personal-info");
        const restHtml=restSecs.map(s=>{
            if(s.type==="experience")return `<p class="practical-sec-title">${escHtml(s.title)}</p>${s.items.length?s.items.map(it=>`<div class="practical-entry"><p class="entry-title">${escHtml(it.role)}</p><p class="entry-sub">${escHtml(it.company)}${it.location?` · ${escHtml(it.location)}`:""} — ${fmtDate(it.startDate,it.endDate,it.current)}</p>${it.bullets&&it.bullets.length?`<ul>${it.bullets.map(b=>`<li>${escHtml(b)}</li>`).join("")}</ul>`:""}</div>`).join(""):`<p class="empty-note">No entries yet.</p>`}`;
            if(s.type==="skills"||s.type==="strengths"){const vals=s.type==="skills"?s.items.map(it=>it.name):s.items.filter(it=>it.value&&it.value.trim()).map(it=>it.value);return `<p class="practical-sec-title">${escHtml(s.title)}</p><div class="practical-plain-chips">${vals.length?vals.map(v=>`<span class="strength-chip">${escHtml(v)}</span>`).join(""):`<p class="empty-note">None added.</p>`}</div>`;}
            if(s.type==="languages")return `<p class="practical-sec-title">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length?s.items.map(it=>`${escHtml(it.name)} (${escHtml(it.level)})`).join(", "):`<span class="empty-note">None added.</span>`}</p>`;
            if(s.type==="certificates")return `<p class="practical-sec-title">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length?s.items.map(it=>escHtml(it.name)).join(", "):`<span class="empty-note">None added.</span>`}</p>`;
            const inner=SR[s.type]?SR[s.type](s):"";
            return `<p class="practical-sec-title">${escHtml(s.title)}</p>${inner.replace(/<p class="(main|side)-label">.*?<\/p>/,"")}`;
        }).join("");
        return `<div class="main"><div class="practical-header"><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><div class="practical-contact-row">${atsContactLine(p)}</div></div><hr class="practical-rule"><p class="summary">${escHtml(p.summary)}</p>${availHtml}${restHtml}</div>`;
    }
    function renderFunctional(data) {
        const p=data.personalDetails, vis=data.sections.filter(s=>s.visible).sort((a,b)=>a.order-b.order);
        const groupSecs=vis.filter(s=>s.type==="custom"&&s.items.length);
        const expSec=vis.find(s=>s.type==="experience");
        const otherSecs=vis.filter(s=>!["custom","experience","personal-info"].includes(s.type));
        const hasGroups=groupSecs.length>0;
        const groupsHtml=groupSecs.map(s=>s.items.map(it=>`<div class="functional-group"><p class="functional-group-title"><span class="dot"></span>${escHtml(it.title||s.title)}</p>${it.bullets&&it.bullets.length?`<ul>${it.bullets.map(b=>`<li>${escHtml(b)}</li>`).join("")}</ul>`:""}</div>`).join("")).join("");
        const historyHtml=expSec?(hasGroups?`<div class="functional-history"><p class="functional-sec-title" style="margin-top:0" data-rf-section-type="experience">Work History</p>${expSec.items.length?expSec.items.map(it=>`<div class="functional-history-item"><span><span class="fh-role">${escHtml(it.role)}</span> — ${escHtml(it.company)}</span><span>${fmtDate(it.startDate,it.endDate,it.current)}</span></div>`).join(""):`<p class="empty-note">No entries yet.</p>`}</div>`:`<p class="functional-sec-title" style="margin-top:0">${escHtml(expSec.title)}</p>${expSec.items.length?expSec.items.map(it=>`<div class="entry"><div class="entry-header"><div><p class="entry-title">${escHtml(it.role)}</p><p class="entry-sub">${escHtml(it.company)}${it.location?` · ${escHtml(it.location)}`:""}</p></div><span class="entry-date">${fmtDate(it.startDate,it.endDate,it.current)}</span></div>${it.bullets&&it.bullets.length?`<ul>${it.bullets.map(b=>`<li>${escHtml(b)}</li>`).join("")}</ul>`:""}</div>`).join(""):`<p class="empty-note">No entries yet.</p>`}`):"";
        const restHtml=otherSecs.map(s=>{
            if(s.type==="skills"||s.type==="strengths"){const vals=s.type==="skills"?s.items.map(it=>it.name):s.items.filter(it=>it.value&&it.value.trim()).map(it=>it.value);return `<p class="functional-sec-title">${escHtml(s.title)}</p><div class="strengths-row">${vals.length?vals.map(v=>`<span class="strength-chip">${escHtml(v)}</span>`).join(""):`<p class="empty-note">None added.</p>`}</div>`;}
            if(s.type==="languages")return `<p class="functional-sec-title">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length?s.items.map(it=>`${escHtml(it.name)} (${escHtml(it.level)})`).join(", "):`<span class="empty-note">None added.</span>`}</p>`;
            if(s.type==="certificates")return `<p class="functional-sec-title">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length?s.items.map(it=>escHtml(it.name)).join(", "):`<span class="empty-note">None added.</span>`}</p>`;
            const inner=SR[s.type]?SR[s.type](s):"";
            return `<p class="functional-sec-title">${escHtml(s.title)}</p>${inner.replace(/<p class="(main|side)-label">.*?<\/p>/,"")}`;
        }).join("");
        return `<div class="main"><div class="functional-header"><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><div class="functional-contact-row">${atsContactLine(p)}</div></div><p class="summary">${escHtml(p.summary)}</p>${renderPersonalInfoAfterSummary(vis,'functional')}${hasGroups?`<p class="functional-sec-title" style="margin-top:0" data-rf-section-type="custom">Areas of Strength</p>${groupsHtml}`:""}${historyHtml}${restHtml}</div>`;
    }
    function renderTrade(data, tid) {
        const p = data.personalDetails, vis = data.sections.filter(s => s.visible).sort((a, b) => a.order - b.order);
        const certSec  = vis.find(s => s.type === "certificates");
        const skillSec = vis.find(s => s.type === "skills");
        const expSec   = vis.find(s => s.type === "experience");
        const otherSecs = vis.filter(s => !["certificates","skills","experience","personal-info"].includes(s.type));

        if (tid === "trade-02") {
            const credHtml = certSec && certSec.items.length
                ? certSec.items.map(it =>
                    `<div class="trade2-cred"><div class="trade2-check"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>${escHtml(it.name)}</div>`
                  ).join("")
                : `<p class="empty-note">None added.</p>`;
            const credHeading = certSec ? `<p class="trade-sec-title" style="margin-top:0" data-rf-section-type="certificates">Credentials</p>` : `<p class="trade-sec-title" style="margin-top:0">Credentials</p>`;

            const toolsHtml2 = skillSec && skillSec.items.length
                ? skillSec.items.map(it => `<div class="trade2-tool">${escHtml(it.name)}</div>`).join("")
                : `<p class="empty-note">None added.</p>`;
            const toolsHeading2 = skillSec ? `<p class="trade-sec-title" data-rf-section-type="skills">Tools</p>` : `<p class="trade-sec-title">Tools</p>`;

            const expHtml2 = expSec
                ? expSec.items.map(it =>
                    `<div class="trade-entry"><div class="entry-header"><div><p class="entry-title">${escHtml(it.role)}</p><p class="entry-sub">${escHtml(it.company)}${it.location ? ` · ${escHtml(it.location)}` : ""}</p></div><span class="entry-date">${fmtDate(it.startDate, it.endDate, it.current)}</span></div>${it.bullets && it.bullets.length ? `<ul>${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`
                  ).join("")
                : `<p class="empty-note">No entries yet.</p>`;

            const otherSecMapper2 = s => {
                if (s.type === "strengths") { const vals = s.items.filter(it => it.value && it.value.trim()).map(it => it.value); return `<p class="trade-sec-title">${escHtml(s.title)}</p><div class="trade-tools-row">${vals.length ? vals.map(v => `<span class="strength-chip">${escHtml(v)}</span>`).join("") : `<p class="empty-note">None added.</p>`}</div>`; }
                if (s.type === "languages") return `<p class="trade-sec-title">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length ? s.items.map(it => `${escHtml(it.name)} (${escHtml(it.level)})`).join(", ") : `<span class="empty-note">None added.</span>`}</p>`;
                if (s.type === "interests") return `<p class="trade-sec-title">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.map(it => escHtml(it.value)).join(" · ")}</p>`;
                if (s.type === "education") return `<p class="trade-sec-title">${escHtml(s.title)}</p>${s.items.map(it => `<div class="trade-entry"><p class="entry-title">${escHtml(it.qualification)}</p><p class="entry-sub">${escHtml(it.institution)}${it.location ? ` · ${escHtml(it.location)}` : ""} — ${fmtDate(it.startDate, it.endDate, it.current)}</p>${it.notes ? `<p style="font-size:10.5px;color:#555;margin:2px 0 0">${escHtml(it.notes)}</p>` : ""}</div>`).join("")}`;
                if (s.type === "custom") return `<p class="trade-sec-title">${escHtml(s.title)}</p>${s.items.map(it => `<div class="trade-entry"><p class="entry-title">${escHtml(it.title || "")}</p>${it.bullets && it.bullets.length ? `<ul>${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}`;
                const inner = SR[s.type] ? SR[s.type](s) : "";
                return `<p class="trade-sec-title">${escHtml(s.title)}</p>${inner.replace(/<p class="(main|side)-label">.*?<\/p>/, "")}`;
            };
            const sideOtherSecs = otherSecs.filter(s => s.type !== "education");
            const mainOtherSecs = otherSecs.filter(s => s.type === "education");
            const restHtmlSide2 = sideOtherSecs.map(otherSecMapper2).join("");
            const restHtmlMain2 = mainOtherSecs.map(otherSecMapper2).join("");

            return `<div class="trade-header trade2-header"><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><div class="trade-contact-row">${atsContactLine(p)}</div></div><div class="trade2-sidebar">${credHeading}${credHtml}${toolsHeading2}${toolsHtml2}${restHtmlSide2}</div><div class="main">${expHtml2 ? `<p class="trade-sec-title" style="margin-top:0">Experience</p>${expHtml2}` : ""}${restHtmlMain2}</div>`;
        }

        const badgesHtml = certSec
            ? (certSec.items.length
                ? `<div class="badge-row">${certSec.items.map(it =>
                    `<div class="trade-badge"><div class="badge-ico"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><span class="badge-txt">${escHtml(it.name)}</span></div>`
                  ).join("")}</div>`
                : `<p class="empty-note">None added.</p>`)
            : "";
        const badgesHeading = certSec
            ? `<p class="trade-sec-title" data-rf-section-type="certificates">Credentials &amp; Training</p>`
            : "";

        const toolsHtml = skillSec
            ? (skillSec.items.length
                ? `<div class="trade-tools-row">${skillSec.items.map(it =>
                    `<span class="strength-chip">${escHtml(it.name)}</span>`
                  ).join("")}</div>`
                : `<p class="empty-note">None added.</p>`)
            : "";
        const toolsHeading = skillSec
            ? `<p class="trade-sec-title" data-rf-section-type="skills">Tools &amp; Equipment</p>`
            : "";

        const expHtml = expSec
            ? (expSec.items.length
                ? expSec.items.map(it =>
                    `<div class="trade-entry"><div class="entry-header"><div><p class="entry-title">${escHtml(it.role)}</p><p class="entry-sub">${escHtml(it.company)}${it.location ? ` · ${escHtml(it.location)}` : ""}</p></div><span class="entry-date">${fmtDate(it.startDate, it.endDate, it.current)}</span></div>${it.bullets && it.bullets.length ? `<ul>${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`
                  ).join("")
                : `<p class="empty-note">No entries yet.</p>`)
            : "";
        const expHeading = expSec
            ? `<p class="trade-sec-title" data-rf-section-type="experience">${escHtml(expSec.title)}</p>`
            : "";

        const restHtml = otherSecs.map(s => {
            if (s.type === "strengths") { const vals = s.items.filter(it => it.value && it.value.trim()).map(it => it.value); return `<p class="trade-sec-title">${escHtml(s.title)}</p><div class="trade-tools-row">${vals.length ? vals.map(v => `<span class="strength-chip">${escHtml(v)}</span>`).join("") : `<p class="empty-note">None added.</p>`}</div>`; }
            if (s.type === "languages") return `<p class="trade-sec-title">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.length ? s.items.map(it => `${escHtml(it.name)} (${escHtml(it.level)})`).join(", ") : `<span class="empty-note">None added.</span>`}</p>`;
            if (s.type === "interests") return `<p class="trade-sec-title">${escHtml(s.title)}</p><p class="ats-plain-list">${s.items.map(it => escHtml(it.value)).join(" · ")}</p>`;
            if (s.type === "education") return `<p class="trade-sec-title">${escHtml(s.title)}</p>${s.items.map(it => `<div class="trade-entry"><p class="entry-title">${escHtml(it.qualification)}</p><p class="entry-sub">${escHtml(it.institution)}${it.location ? ` · ${escHtml(it.location)}` : ""} — ${fmtDate(it.startDate, it.endDate, it.current)}</p>${it.notes ? `<p style="font-size:10.5px;color:#555;margin:2px 0 0">${escHtml(it.notes)}</p>` : ""}</div>`).join("")}`;
            if (s.type === "custom") return `<p class="trade-sec-title">${escHtml(s.title)}</p>${s.items.map(it => `<div class="trade-entry"><p class="entry-title">${escHtml(it.title || "")}</p>${it.bullets && it.bullets.length ? `<ul>${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}`;
            const inner = SR[s.type] ? SR[s.type](s) : "";
            return `<p class="trade-sec-title">${escHtml(s.title)}</p>${inner.replace(/<p class="(main|side)-label">.*?<\/p>/, "")}`;
        }).join("");

        return `<div class="trade-header"><p class="name">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p><div class="trade-contact-row">${atsContactLine(p)}</div></div><div class="main">${badgesHeading}${badgesHtml}${toolsHeading}${toolsHtml}${expHeading}${expHtml}${restHtml}</div>`;
    }

    function renderMonogram(data) {
        const p = data.personalDetails, vis = data.sections.filter(s => s.visible).sort((a, b) => a.order - b.order);
        const skillSec = vis.find(s => s.type === "skills");
        const langSec  = vis.find(s => s.type === "languages");
        const certSec  = vis.find(s => s.type === "certificates");
        const intSec   = vis.find(s => s.type === "interests");
        const piSec    = vis.find(s => s.type === "personal-info");
        const refSec   = vis.find(s => s.type === "references");
        // mainHtml's mapper below already has working branches for "projects" and
        // "custom" - but this filter only ever let "experience"/"education" through,
        // so those branches were dead code and both section types were silently
        // dropped from the render entirely (not even by the empty-items check).
        const mainSecs = vis.filter(s => MAIN_TYPES.has(s.type) || s.type === "projects" || s.type === "custom");

        const badgeEl = p.photo
            ? `<div class="mono-badge"><img src="${p.photo}" alt="Photo"></div>`
            : `<div class="mono-badge">${initials(p.fullName)}</div>`;

        const contactItems = [
            { icon: "email",    val: p.email },
            { icon: "phone",    val: p.phone },
            { icon: "location", val: p.location },
            ...(p.links || []).map(l => ({ icon: "link", val: l.url }))
        ].filter(i => i.val);

        const contactHtml = contactItems.map((i, idx) =>
            `<span class="contact-inline-item"><span class="icon-inline">${icoSVG(i.icon)}</span>${escHtml(i.val)}</span>${idx < contactItems.length - 1 ? '<span class="mono-divider"> · </span>' : ""}`
        ).join("");

        const skillsHtml = skillSec && skillSec.items.length
            ? `<p class="mono-kicker">${escHtml(skillSec.title)}</p><hr class="mono-hr"><div class="mono-two-col">${skillSec.items.map(it => `<div class="mono-skill-row"><span class="mono-chip-line">${escHtml(it.name)}</span>${dotRating(it.level)}</div>`).join("")}</div>`
            : "";

        const langHtml = langSec && langSec.items.length
            ? `<p class="mono-kicker">${escHtml(langSec.title)}</p><hr class="mono-hr"><div>${langSec.items.map(it => `<div class="mono-skill-row"><span>${escHtml(it.name)}</span><span style="font-size:10px;color:#888">${escHtml(it.level)}</span></div>`).join("")}</div>`
            : "";

        const certHtml = certSec && certSec.items.length
            ? `<p class="mono-kicker">${escHtml(certSec.title)}</p><hr class="mono-hr"><div>${certSec.items.map(it => `<div style="font-size:10.5px;padding:2px 0;border-bottom:1px solid #F0EDE8;color:#333">${escHtml(it.name)}</div>`).join("")}</div>`
            : "";

        const piHtml = piSec && piSec.items.length
            ? `<p class="mono-kicker">${escHtml(piSec.title)}</p><hr class="mono-hr"><div>${piSec.items.map(it => `<div style="font-size:10.5px;padding:1px 0;color:#555">${escHtml(it.label)}: <strong style="color:#222">${escHtml(it.value)}</strong></div>`).join("")}</div>`
            : "";

        const intHtml = intSec && intSec.items.length
            ? `<p class="mono-kicker">${escHtml(intSec.title)}</p><hr class="mono-hr"><p style="font-size:10.5px;color:#555;line-height:1.5">${intSec.items.map(it => escHtml(it.value)).join(" · ")}</p>`
            : "";

        // references had no handler anywhere in this template - it was always
        // dropped, regardless of item count.
        const refHtml = refSec && refSec.items.length
            ? `<p class="mono-kicker" data-rf-section-type="references">${escHtml(refSec.title)}</p><hr class="mono-hr"><div>${refSec.items.map(it => `<div style="font-size:10.5px;padding:2px 0;color:#333">${escHtml(it.name)}${it.title ? ` — ${escHtml(it.title)}` : ""}</div>`).join("")}</div>`
            : "";

        const mainHtml = mainSecs.map(s => {
            if (s.type === "experience") return `<p class="mono-kicker">${escHtml(s.title)}</p><hr class="mono-hr">${s.items.map(it => `<div class="mono-entry"><div class="entry-header"><div><p class="entry-title" style="font-size:12px">${escHtml(it.role)}</p><p class="entry-sub" style="font-size:10.5px">${escHtml(it.company)}${it.location ? ` · ${escHtml(it.location)}` : ""}</p></div><span class="entry-date" style="font-size:10px">${fmtDate(it.startDate, it.endDate, it.current)}</span></div>${it.bullets && it.bullets.length ? `<ul style="font-size:10.5px">${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}`;
            if (s.type === "education") return `<p class="mono-kicker">${escHtml(s.title)}</p><hr class="mono-hr">${s.items.map(it => `<div class="mono-entry"><p class="entry-title" style="font-size:12px">${escHtml(it.qualification)}</p><p class="entry-sub" style="font-size:10.5px">${escHtml(it.institution)} — ${fmtDate(it.startDate, it.endDate, it.current)}</p>${it.notes ? `<p style="font-size:10px;color:#777;margin:2px 0 0">${escHtml(it.notes)}</p>` : ""}</div>`).join("")}`;
            if (s.type === "projects") return `<p class="mono-kicker">${escHtml(s.title)}</p><hr class="mono-hr">${s.items.map(it => `<div class="mono-entry"><p class="entry-title" style="font-size:12px">${escHtml(it.name)}</p>${it.bullets && it.bullets.length ? `<ul style="font-size:10.5px">${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}`;
            if (s.type === "custom") return `<p class="mono-kicker">${escHtml(s.title)}</p><hr class="mono-hr">${s.items.map(it => `<div class="mono-entry"><p class="entry-title" style="font-size:12px">${escHtml(it.title || "")}</p>${it.bullets && it.bullets.length ? `<ul style="font-size:10.5px">${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}`;
            return "";
        }).join("");

        return `<div class="mono-top">${badgeEl}<p class="name" style="font-size:26px">${escHtml(p.fullName)}</p><p class="job-title" style="font-size:13px">${escHtml(p.jobTitle)}</p><div class="mono-contact-row">${contactHtml}</div></div><div class="main">${p.summary ? `<p class="summary" style="margin-bottom:12px">${escHtml(p.summary)}</p>` : ""}${mainHtml}${skillsHtml}${langHtml}${certHtml}${piHtml}${intHtml}${refHtml}</div>`;
    }

    function renderFacet(data) {
        const p = data.personalDetails, vis = data.sections.filter(s => s.visible).sort((a, b) => a.order - b.order);
        const skillSec = vis.find(s => s.type === "skills");
        const langSec  = vis.find(s => s.type === "languages");
        const certSec  = vis.find(s => s.type === "certificates");
        const intSec   = vis.find(s => s.type === "interests");
        const piSec    = vis.find(s => s.type === "personal-info");
        const strSec   = vis.find(s => s.type === "strengths");
        const refSec   = vis.find(s => s.type === "references");
        const projSec  = vis.find(s => s.type === "projects");
        const customSec= vis.find(s => s.type === "custom");
        const mainSecs = vis.filter(s => MAIN_TYPES.has(s.type));

        const badgeEl = p.photo
            ? `<div class="facet-badge"><img src="${p.photo}" alt="Photo"></div>`
            : `<div class="facet-badge">${initials(p.fullName)}</div>`;

        const contactMini = [
            { icon: "email",    val: p.email },
            { icon: "phone",    val: p.phone },
            { icon: "location", val: p.location }
        ].filter(i => i.val).map(i =>
            `<div><span class="icon-inline" style="margin-right:2px">${icoSVG(i.icon)}</span>${escHtml(i.val)}</div>`
        ).join("");

        const skillsHtml = skillSec && skillSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(skillSec.title)}</p>${skillSec.items.map(it => `<div class="facet-skill-row"><span>${escHtml(it.name)}</span>${dotRating(it.level)}</div>`).join("")}</div>`
            : "";
        const langHtml = langSec && langSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(langSec.title)}</p>${langSec.items.map(it => `<div class="facet-skill-row"><span>${escHtml(it.name)}</span><span style="font-size:9px;opacity:.7">${escHtml(it.level)}</span></div>`).join("")}</div>`
            : "";
        const certHtml = certSec && certSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(certSec.title)}</p>${certSec.items.map(it => `<div style="font-size:10px;color:rgba(255,255,255,0.85);padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.1)">${escHtml(it.name)}</div>`).join("")}</div>`
            : "";
        const piHtml = piSec && piSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(piSec.title)}</p>${elegantAvailGrid(piSec)}</div>`
            : "";
        const strHtml = strSec && strSec.items.some(it => it.value && it.value.trim())
            ? `<div class="side-section"><p class="side-label">${escHtml(strSec.title)}</p><div class="strengths-row">${strSec.items.filter(it => it.value && it.value.trim()).map(it => `<span class="strength-chip" style="background:rgba(255,255,255,0.2);color:#fff;border:1px solid rgba(255,255,255,0.3)">${escHtml(it.value)}</span>`).join("")}</div></div>`
            : "";
        const intHtml = intSec && intSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(intSec.title)}</p><p style="font-size:10px;color:rgba(255,255,255,0.8);line-height:1.5">${intSec.items.map(it => escHtml(it.value)).join(" · ")}</p></div>`
            : "";
        const refHtml = refSec && refSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(refSec.title)}</p>${refSec.items.map(it => `<div style="font-size:10px;color:rgba(255,255,255,0.85);padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.1)"><div>${escHtml(it.name)}</div><div style="opacity:.7">${escHtml(it.title)}</div><div style="opacity:.7">${escHtml(it.phone)} · ${escHtml(it.email)}</div></div>`).join("")}</div>`
            : "";
        const projHtml = projSec && projSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(projSec.title)}</p>${projSec.items.map(it => `<div style="font-size:10px;color:rgba(255,255,255,0.85);padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.1)"><div>${escHtml(it.name)}</div>${it.bullets && it.bullets.length ? `<ul style="margin:2px 0 0;padding-left:14px">${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}</div>`
            : "";
        const customHtml = customSec && customSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(customSec.title)}</p>${customSec.items.map(it => `<div style="font-size:10px;color:rgba(255,255,255,0.85);padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.1)"><div>${escHtml(it.title || "")}</div>${it.bullets && it.bullets.length ? `<ul style="margin:2px 0 0;padding-left:14px">${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}</div>`
            : "";

        const mainHtml = mainSecs.map(s => SR[s.type] ? SR[s.type](s) : "").join("");

        return `<div class="facet-sidebar">${badgeEl}<div class="facet-contact-mini">${contactMini}</div>${skillsHtml}${langHtml}${certHtml}${piHtml}${strHtml}${intHtml}${refHtml}${projHtml}${customHtml}</div><div class="facet-main"><p class="name" style="font-size:26px">${escHtml(p.fullName)}</p><p class="job-title">${escHtml(p.jobTitle)}</p>${p.summary ? `<p class="summary" style="margin:8px 0 12px">${escHtml(p.summary)}</p>` : ""}${mainHtml}</div>`;
    }

    function renderDuotone(data) {
        const p = data.personalDetails, vis = data.sections.filter(s => s.visible).sort((a, b) => a.order - b.order);
        const skillSec = vis.find(s => s.type === "skills");
        const langSec  = vis.find(s => s.type === "languages");
        const certSec  = vis.find(s => s.type === "certificates");
        const intSec   = vis.find(s => s.type === "interests");
        const piSec    = vis.find(s => s.type === "personal-info");
        const strSec   = vis.find(s => s.type === "strengths");
        const refSec   = vis.find(s => s.type === "references");
        const projSec  = vis.find(s => s.type === "projects");
        const customSec= vis.find(s => s.type === "custom");
        const mainSecs = vis.filter(s => MAIN_TYPES.has(s.type));

        const skillsHtml = skillSec && skillSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(skillSec.title)}</p>${skillSec.items.map(it => `<div class="duo-skill-row"><span style="font-size:10.5px">${escHtml(it.name)}</span>${dotRating(it.level)}</div>`).join("")}</div>`
            : "";
        const langHtml = langSec && langSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(langSec.title)}</p>${langSec.items.map(it => `<div class="duo-skill-row"><span style="font-size:10.5px">${escHtml(it.name)}</span><span style="font-size:9px;color:#888">${escHtml(it.level)}</span></div>`).join("")}</div>`
            : "";
        const certHtml = certSec && certSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(certSec.title)}</p>${certSec.items.map(it => `<div style="font-size:10.5px;color:#555;padding:2px 0;border-bottom:1px solid #E8E4DE">${escHtml(it.name)}</div>`).join("")}</div>`
            : "";
        const piHtml = piSec && piSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(piSec.title)}</p>${elegantAvailGrid(piSec)}</div>`
            : "";
        const strHtml = strSec && strSec.items.some(it => it.value && it.value.trim())
            ? `<div class="side-section"><p class="side-label">${escHtml(strSec.title)}</p><div class="strengths-row">${strSec.items.filter(it => it.value && it.value.trim()).map(it => `<span class="strength-chip">${escHtml(it.value)}</span>`).join("")}</div></div>`
            : "";
        const intHtml = intSec && intSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(intSec.title)}</p><p style="font-size:10.5px;color:#666;line-height:1.5">${intSec.items.map(it => escHtml(it.value)).join(" · ")}</p></div>`
            : "";
        const refHtml = refSec && refSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(refSec.title)}</p>${refSec.items.map(it => `<div style="font-size:10.5px;color:#555;padding:2px 0;border-bottom:1px solid #E8E4DE"><div>${escHtml(it.name)}</div><div style="color:#888">${escHtml(it.title)}</div><div style="color:#888">${escHtml(it.phone)} · ${escHtml(it.email)}</div></div>`).join("")}</div>`
            : "";
        const projHtml = projSec && projSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(projSec.title)}</p>${projSec.items.map(it => `<div style="font-size:10.5px;color:#555;padding:2px 0;border-bottom:1px solid #E8E4DE"><div>${escHtml(it.name)}</div>${it.bullets && it.bullets.length ? `<ul style="margin:2px 0 0;padding-left:14px">${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}</div>`
            : "";
        const customHtml = customSec && customSec.items.length
            ? `<div class="side-section"><p class="side-label">${escHtml(customSec.title)}</p>${customSec.items.map(it => `<div style="font-size:10.5px;color:#555;padding:2px 0;border-bottom:1px solid #E8E4DE"><div>${escHtml(it.title || "")}</div>${it.bullets && it.bullets.length ? `<ul style="margin:2px 0 0;padding-left:14px">${it.bullets.map(b => `<li>${escHtml(b)}</li>`).join("")}</ul>` : ""}</div>`).join("")}</div>`
            : "";

        const mainHtml = mainSecs.map(s => SR[s.type] ? SR[s.type](s) : "").join("");

        return `<div class="duo-sidebar"><p class="name" style="font-size:22px">${escHtml(p.fullName)}</p><p class="job-title" style="font-size:12px">${escHtml(p.jobTitle)}</p><div class="duo-gold-rule"></div><ul class="contact-list" style="font-size:10px">${contactListHtml(p)}</ul>${skillsHtml}${langHtml}${certHtml}${piHtml}${strHtml}${intHtml}${refHtml}${projHtml}${customHtml}</div><div class="duo-main"><p class="summary" style="margin:0 0 12px">${escHtml(p.summary)}</p>${mainHtml}</div>`;
    }

function generateSectionItems(sec) {
    let inner = '';
    switch (sec.type) {
        case 'experience':
        case 'education':
        case 'projects':
        case 'custom':
            inner = sec.items.map(it => {
                if (sec.type === 'experience') return `<div class="entry"><div class="entry-header"><div><p class="entry-title">${escHtml(it.role)}</p><p class="entry-sub">${escHtml(it.company)}${it.location?` · ${escHtml(it.location)}`:""}</p></div><span class="entry-date">${fmtDate(it.startDate,it.endDate,it.current)}</span></div>${it.bullets&&it.bullets.length?`<ul>${it.bullets.map(b=>`<li>${escHtml(b)}</li>`).join("")}</ul>`:""}</div>`;
                if (sec.type === 'education') return `<div class="entry"><div class="entry-header"><div><p class="entry-title">${escHtml(it.qualification)}</p><p class="entry-sub">${escHtml(it.institution)}${it.location?` · ${escHtml(it.location)}`:""}</p></div><span class="entry-date">${fmtDate(it.startDate,it.endDate,it.current)}</span></div>${it.notes?`<ul><li>${escHtml(it.notes)}</li></ul>`:""}</div>`;
                if (sec.type === 'projects') return `<div class="entry"><div class="entry-header"><div><p class="entry-title">${escHtml(it.name)}</p></div><span class="entry-date">${fmtDate(it.startDate,it.endDate,false)}</span></div>${it.bullets&&it.bullets.length?`<ul>${it.bullets.map(b=>`<li>${escHtml(b)}</li>`).join("")}</ul>`:""}</div>`;
                if (sec.type === 'custom') return `<div class="entry"><p class="entry-title">${escHtml(it.title||"")}</p>${it.bullets&&it.bullets.length?`<ul>${it.bullets.map(b=>`<li>${escHtml(b)}</li>`).join("")}</ul>`:""}</div>`;
                return '';
            }).join('');
            break;
        case 'skills':
            inner = sec.items.map(it => `<span class="skill-tag">${escHtml(it.name)}</span>`).join('');
            break;
        case 'languages':
            inner = sec.items.map(it => `<div class="side-item">${escHtml(it.name)} <span class="meta">${escHtml(it.level)}</span></div>`).join('');
            break;
        case 'certificates':
            inner = sec.items.map(it => `<div class="side-item">${escHtml(it.name)}</div>`).join('');
            break;
        case 'references':
            inner = sec.items.map(it => {
                const phoneLine = it.phone ? `<div class="ref-contact-line"><span class="icon-inline" style="color:var(--color-accent)">${icoSVG("phone")}</span><span>${escHtml(it.phone)}</span></div>` : "";
                const emailLine = it.email ? `<div class="ref-contact-line"><span class="icon-inline" style="color:var(--color-accent)">${icoSVG("email")}</span><span>${escHtml(it.email)}</span></div>` : "";
                return `<div class="ref-item"><div class="ref-name">${escHtml(it.name)}</div><div class="ref-details">${escHtml(it.title)}</div><div class="ref-contact">${phoneLine}${emailLine}</div></div>`;
            }).join('');
            break;
        case 'interests':
            inner = sec.items.map(it => escHtml(it.value)).join(" · ");
            break;
        case 'strengths':
            inner = sec.items.filter(it=>it.value&&it.value.trim()).map(it => `<span class="strength-chip">${escHtml(it.value)}</span>`).join('');
            break;
        case 'personal-info':
            inner = sec.items.map(it => `<div class="side-item">${escHtml(it.label)}: <span class="meta">${escHtml(it.value)}</span></div>`).join('');
            break;
        default:
            inner = '';
    }
    return inner;
}

let cvData, currentTemplateId = "modern-01", currentStep = 0,
    atsPanelOpen = false, targetJD = "", usingDemoData = true;
let allResumes = {}, currentCvId = null, isMobilePreviewOpen = false;

// Phase 4 history bridge: editor-history.js owns snapshots while this file
// retains the canonical lexical editor state.
window.applyEditorHistoryState = function (state) {
    cvData = state;
    currentTemplateId = (state && state.meta && state.meta.templateId) || currentTemplateId || "modern-01";
};
window.getEditorStep = function () { return currentStep; };
let _saveToastTimer = null;

function escHtml(s) { if (!s) return ""; return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function genId(p)   { return `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2,5)}`; }
function getP(o, path) { return path.split(".").reduce((a,k) => a==null?undefined:a[k], o); }
function setP(o, path, val) {
    const ks = path.split(".");
    let c = o;
    for (let i = 0; i < ks.length - 1; i++) {
        const k = ks[i];
        if (c[k] === undefined || c[k] === null) {
            c[k] = isNaN(Number(ks[i+1])) ? {} : [];
        }
        c = c[k];
    }
    c[ks[ks.length - 1]] = val;
}

// Canonical editor mutation boundary. Every user-visible cvData mutation must
// enter and leave through this function. History is committed only after a
// successful mutation; rendering and persistence happen exactly once.
window.getEditorState = function () { return cvData; };
window.setEditorState = function (state) { cvData = state; currentTemplateId = state?.meta?.templateId || currentTemplateId; };

function commitEditorMutation(mutator, options = {}) {
    const { force = true, step = currentStep, updateLabel = false, after } = options;
    const canHistory = typeof editorHistoryBegin === 'function' && typeof editorHistoryCommit === 'function';
    if (canHistory) editorHistoryBegin(force);

    let changed = false;
    try {
        const result = mutator();
        changed = result !== false;
    } catch (error) {
        if (canHistory && typeof editorHistoryBoundary === 'function') editorHistoryBoundary();
        throw error;
    }

    if (canHistory) {
        changed = changed && editorHistoryCommit();
    }

    if (!changed) return false;
    renderPreview();
    if (step !== null && step !== undefined) setStep(step);
    if (updateLabel) updatePaLabel();
    autoSave();
    if (typeof after === 'function') after();
    return true;
}
function fmtDate(start, end, cur) {
    const f = d => {
        if (!d) return "";
        const [y, m] = d.split("-");
        const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return m ? `${M[+m-1]} ${y}` : y;
    };
    if (!start) return "";
    const endLabel = cur ? "Present" : f(end);
    return endLabel ? `${f(start)} - ${endLabel}` : f(start);
}
function initials(name) { return (name||"").trim().split(/\s+/).map(w=>w[0]).filter(Boolean).slice(0,2).join("").toUpperCase(); }
function dotRating(level) {
    const map = { "Beginner":1,"Basic":1,"Intermediate":3,"Proficient":4,"Advanced":4,"Expert":5,"Native":5,"Fluent":5,"Conversational":3 };
    const n = map[level] || 3;
    let d = "";
    for (let i=0;i<5;i++) d += `<span class="rate-dot${i<n?" filled":""}"></span>`;
    return `<span class="rate-dots">${d}</span>`;
}
function icoSVG(name) {
    const i = {
        email:    `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
        phone:    `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
        location: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
        link:     `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`
    };
    return i[name] || "";
}
function debounce(fn, delay) { let t; return function(...a) { clearTimeout(t); t = setTimeout(()=>fn.apply(this,a),delay); }; }

function loadAllResumes() {
    try {
        const stored = localStorage.getItem('Mellow CV_all_resumes');
        if (stored) {
            allResumes = JSON.parse(stored);
        } else {
            const def     = JSON.parse(document.getElementById('cv-data').textContent);
            const starter = JSON.parse(document.getElementById('cv-data-starter').textContent);
            const trade   = JSON.parse(document.getElementById('cv-data-trade').textContent);
            [def, starter, trade].forEach(r => {
                const pi = r.sections.find(s => s.type === 'personal-info');
                if (pi) pi.order = 0;
            });
            allResumes[def.meta.cvId]     = def;
            allResumes[starter.meta.cvId] = starter;
            allResumes[trade.meta.cvId]   = trade;
            saveAllResumes();
        }
    } catch(e) { allResumes = {}; }
}
function saveAllResumes() { try { localStorage.setItem('Mellow CV_all_resumes', JSON.stringify(allResumes)); } catch(e) {} }
function getCurrentResume() {
    if (!currentCvId || !allResumes[currentCvId]) {
        const ids = Object.keys(allResumes);
        if (ids.length) currentCvId = ids[0];
        else { const def = JSON.parse(document.getElementById('cv-data').textContent); currentCvId = def.meta.cvId; allResumes[currentCvId] = def; saveAllResumes(); }
    }
    return allResumes[currentCvId];
}
function setCurrentResume(cvId) {
    if (allResumes[cvId]) {
        if (typeof editorHistoryClear === 'function') editorHistoryClear();
        currentCvId = cvId; cvData = allResumes[cvId];
        currentTemplateId = cvData.meta.templateId || 'modern-01';
        usingDemoData = false;
        renderPreview(); setStep(currentStep); updatePaLabel(); autoSave(); navigate('builder');
    }
}
function loadData() {
    loadAllResumes();
    const ids = Object.keys(allResumes);
    if (ids.length) {
        currentCvId = ids[0]; cvData = allResumes[currentCvId];
        if (typeof editorHistoryClear === 'function') editorHistoryClear();
        currentTemplateId = cvData.meta.templateId || 'modern-01'; usingDemoData = false;
    } else {
        const def = JSON.parse(document.getElementById('cv-data').textContent);
        currentCvId = def.meta.cvId; allResumes[currentCvId] = def; saveAllResumes();
        cvData = def; currentTemplateId = def.meta.templateId || 'modern-01'; usingDemoData = true;
    }
}
let lastSavedAt = null;
function autoSave() {
    if (!cvData) return;
    allResumes[currentCvId] = cvData;
    saveAllResumes();
    lastSavedAt = Date.now();
    updateAutosaveLabel();
    const dot = document.getElementById('save-dot');
    if (dot) { dot.classList.add('saving'); setTimeout(()=>dot.classList.remove('saving'),600); }
    clearTimeout(_saveToastTimer);
    _saveToastTimer = setTimeout(()=>showToast('Auto-saved','success'), 1500);
}
function updateAutosaveLabel() {
    const el = document.getElementById('autosave-label');
    if (!el) return;
    if (!lastSavedAt) { el.textContent = 'Not saved yet'; return; }
    const secs = Math.round((Date.now() - lastSavedAt) / 1000);
    if (secs < 3) el.textContent = 'Saved just now';
    else if (secs < 60) el.textContent = `Saved ${secs}s ago`;
    else {
        const mins = Math.round(secs / 60);
        el.textContent = mins === 1 ? 'Saved 1 min ago' : `Saved ${mins} min ago`;
    }
}
setInterval(updateAutosaveLabel, 1000);
function toggleQuickFab() { const w = document.getElementById('quick-fab-wrap'); if (w) w.classList.toggle('open'); }
function closeQuickFab()  { const w = document.getElementById('quick-fab-wrap'); if (w) w.classList.remove('open'); }
document.addEventListener('click', (e) => {
    const wrap = document.getElementById('quick-fab-wrap');
    if (wrap && wrap.classList.contains('open') && !wrap.contains(e.target)) closeQuickFab();
});

function showToast(msg, type='info') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = msg;
    c.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    if (type !== 'loading') setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),300); },3000);
    return t;
}

function renderManager() {
    const grid = document.getElementById('manager-grid');
    const count = document.getElementById('resume-count');
    const ids = Object.keys(allResumes);
    count.textContent = ids.length;
    if (!ids.length) { grid.innerHTML='<p style="grid-column:1/-1;text-align:center;color:var(--t3);">No resumes yet. Create one!</p>'; return; }
    grid.innerHTML = ids.map(id => {
        const r = allResumes[id];
        const name = r.personalDetails.fullName || 'Untitled';
        const tmpl = r.meta.templateId || 'modern-01';
        const svg  = SVGS[tmpl] || generateThumbnailSVG('modern-01');
        const isCurrent = (id===currentCvId);
        return `<div class="resume-card" style="${isCurrent?'border:2px solid var(--accent);':''}">
            <div class="thumb">${svg}</div>
            <div class="meta"><strong>${escHtml(name)}</strong><small>${tmpl}</small></div>
            <div class="actions">
                <button class="btn btn-sm btn-primary" onclick="setCurrentResume('${id}')">Open</button>
                <button class="btn btn-sm btn-outline" onclick="duplicateResume('${id}')">Duplicate</button>
                <button class="btn btn-sm btn-outline" onclick="renameResume('${id}')">Rename</button>
                <button class="btn btn-sm btn-outline" onclick="deleteResume('${id}')" style="color:#DC2626;">Delete</button>
            </div></div>`;
    }).join('');
    renderCLManagerList();
}
function createNewResume() {
    const base = JSON.parse(document.getElementById('cv-data').textContent);
    const newId = 'cv_' + Date.now().toString(36);
    base.meta.cvId = newId; base.personalDetails.fullName = 'New Resume';
    allResumes[newId] = base; saveAllResumes(); renderManager(); setCurrentResume(newId);
    showToast('New resume created','success');
}
function duplicateResume(id) { const copy=JSON.parse(JSON.stringify(allResumes[id])); const newId='cv_'+Date.now().toString(36); copy.meta.cvId=newId; copy.personalDetails.fullName+=' (copy)'; allResumes[newId]=copy; saveAllResumes(); renderManager(); showToast('Duplicated','success'); }
function renameResume(id)    { const n=prompt('Enter new name:',allResumes[id].personalDetails.fullName); if(n&&n.trim()){ allResumes[id].personalDetails.fullName=n.trim(); saveAllResumes(); renderManager(); if(currentCvId===id){cvData=allResumes[id];renderPreview();updatePaLabel();} showToast('Renamed','success'); } }
function deleteResume(id)    { if(!confirm('Delete this resume?'))return; delete allResumes[id]; saveAllResumes(); renderManager(); if(currentCvId===id){const ids=Object.keys(allResumes); if(ids.length)setCurrentResume(ids[0]); else createNewResume();} showToast('Deleted','info'); }

// ---------- COVER LETTERS (separate top-level data model & storage — not squeezed into cvData) ----------
let allCoverLetters = {};
let currentClId = null;
let clData = null;

function loadAllCoverLetters() {
    try {
        const stored = localStorage.getItem('Mellow CV_all_coverletters');
        allCoverLetters = stored ? JSON.parse(stored) : {};
    } catch(e) { allCoverLetters = {}; }
}
function saveAllCoverLetters() { try { localStorage.setItem('Mellow CV_all_coverletters', JSON.stringify(allCoverLetters)); } catch(e) {} }

function blankCoverLetter(sourceCvId) {
    const src = sourceCvId && allResumes[sourceCvId];
    const p = src ? src.personalDetails : null;
    return {
        meta: { clId: 'cl_' + Date.now().toString(36), templateId: 'cl-01', createdFrom: sourceCvId || null, label: '' },
        sender: {
            fullName: p ? p.fullName : '', email: p ? p.email : '',
            phone: p ? p.phone : '', location: p ? p.location : ''
        },
        recipient: { hiringManager: '', company: '', companyAddress: '' },
        letter: {
            date: new Date().toLocaleDateString('en-ZA', { day:'numeric', month:'long', year:'numeric' }),
            jobTitle: p ? p.jobTitle : '', greeting: 'Dear Hiring Manager,', body: '', closing: 'Sincerely,'
        }
    };
}
function clDisplayName(cl) {
    return cl.meta.label || [cl.letter.jobTitle, cl.recipient.company].filter(Boolean).join(' — ') || 'Untitled Cover Letter';
}

function renderCLManagerList() {
    const grid = document.getElementById('cl-manager-grid');
    const count = document.getElementById('cl-count');
    if (!grid) return;
    const ids = Object.keys(allCoverLetters);
    if (count) count.textContent = ids.length;
    if (!ids.length) { grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--t3);">No cover letters yet.</p>'; return; }
    grid.innerHTML = ids.map(id => {
        const cl = allCoverLetters[id];
        const tmplName = (CL_TEMPLATES.find(t=>t.id===cl.meta.templateId)||{}).name || cl.meta.templateId;
        const isCurrent = (id===currentClId);
        return `<div class="resume-card" style="${isCurrent?'border:2px solid var(--accent);':''}">
            <div class="thumb" style="display:flex;align-items:center;justify-content:center;font-size:32px">✉️</div>
            <div class="meta"><strong>${escHtml(clDisplayName(cl))}</strong><small>${escHtml(tmplName)}</small></div>
            <div class="actions">
                <button class="btn btn-sm btn-primary" onclick="setCurrentCoverLetter('${id}')">Open</button>
                <button class="btn btn-sm btn-outline" onclick="duplicateCoverLetter('${id}')">Duplicate</button>
                <button class="btn btn-sm btn-outline" onclick="renameCoverLetter('${id}')">Rename</button>
                <button class="btn btn-sm btn-outline" onclick="deleteCoverLetter('${id}')" style="color:#DC2626;">Delete</button>
            </div></div>`;
    }).join('');
}

function createNewCoverLetter(sourceCvId) {
    const cl = blankCoverLetter(sourceCvId || currentCvId);
    allCoverLetters[cl.meta.clId] = cl;
    saveAllCoverLetters();
    renderCLManagerList();
    setCurrentCoverLetter(cl.meta.clId);
    showToast('New cover letter created', 'success');
}
function setCurrentCoverLetter(clId) {
    if (!allCoverLetters[clId]) return;
    currentClId = clId; clData = allCoverLetters[clId];
    renderCLForm(); renderCoverLetterPreview(); autoSaveCoverLetter(); navigate('clbuilder');
}
function duplicateCoverLetter(id) {
    const copy = JSON.parse(JSON.stringify(allCoverLetters[id]));
    const newId = 'cl_' + Date.now().toString(36);
    copy.meta.clId = newId;
    allCoverLetters[newId] = copy; saveAllCoverLetters(); renderCLManagerList();
    showToast('Duplicated', 'success');
}
function renameCoverLetter(id) {
    const cl = allCoverLetters[id];
    const n = prompt('Enter a label for this cover letter:', clDisplayName(cl));
    if (n && n.trim()) {
        cl.meta.label = n.trim(); saveAllCoverLetters(); renderCLManagerList();
        showToast('Renamed', 'success');
    }
}
function deleteCoverLetter(id) {
    if (!confirm('Delete this cover letter?')) return;
    delete allCoverLetters[id]; saveAllCoverLetters(); renderCLManagerList();
    if (currentClId === id) { currentClId = null; clData = null; }
    showToast('Deleted', 'info');
}

const CL_TEMPLATES = [
    { id: 'cl-01', name: 'Classic' },
    { id: 'cl-02', name: 'Modern' }
];

function renderCLForm() {
    const panel = document.getElementById('cl-form-panel');
    if (!panel || !clData) return;
    const { sender, recipient, letter } = clData;
    panel.innerHTML = `
        <p class="ep-sh">Template</p>
        <div style="display:flex;gap:8px;margin-bottom:16px">
            ${CL_TEMPLATES.map(t => `<button class="btn btn-sm ${clData.meta.templateId===t.id?'btn-primary':'btn-outline'}" onclick="setCLTemplate('${t.id}')">${t.name}</button>`).join('')}
        </div>

        <p class="ep-sh">Your Details</p>
        <div class="f"><label>Full Name</label><input value="${escHtml(sender.fullName)}" oninput="updateCL('sender','fullName',this.value)"></div>
        <div class="f-row">
            <div class="f"><label>Email</label><input type="email" value="${escHtml(sender.email)}" oninput="updateCL('sender','email',this.value)"></div>
            <div class="f"><label>Phone</label><input type="tel" value="${escHtml(sender.phone)}" oninput="updateCL('sender','phone',this.value)"></div>
        </div>
        <div class="f"><label>Location</label><input value="${escHtml(sender.location)}" oninput="updateCL('sender','location',this.value)"></div>

        <p class="ep-sh">Recipient</p>
        <div class="f"><label>Hiring Manager (optional)</label><input value="${escHtml(recipient.hiringManager)}" oninput="updateCL('recipient','hiringManager',this.value)"></div>
        <div class="f"><label>Company</label><input value="${escHtml(recipient.company)}" oninput="updateCL('recipient','company',this.value)"></div>
        <div class="f"><label>Company Address (optional)</label><input value="${escHtml(recipient.companyAddress)}" oninput="updateCL('recipient','companyAddress',this.value)"></div>

        <p class="ep-sh">The Letter</p>
        <div class="f"><label>Position applying for</label><input value="${escHtml(letter.jobTitle)}" oninput="updateCL('letter','jobTitle',this.value)"></div>
        <div class="f"><label>Date</label><input value="${escHtml(letter.date)}" oninput="updateCL('letter','date',this.value)"></div>
        <div class="f"><label>Greeting</label><input value="${escHtml(letter.greeting)}" oninput="updateCL('letter','greeting',this.value)"></div>
        <div class="f">
            <div class="f-hd"><label>Letter Body</label><span class="word-count" id="cl-wc">0 words</span></div>
            <textarea rows="12" id="cl-body-input" oninput="updateCL('letter','body',this.value);updateCLBodyWordCount(this)">${escHtml(letter.body)}</textarea>
        </div>
        <button class="btn-ai" onclick="aiDraftCoverLetter(this)">✨ AI Draft Letter</button>
        <p class="ai-tip">AI drafts aren't perfectly polished — regenerate or tweak if needed</p>
        <div class="ai-inline-panel" id="cl-ai-status"></div>
        <div class="f"><label>Closing</label><input value="${escHtml(letter.closing)}" oninput="updateCL('letter','closing',this.value)"></div>
    `;
    updateCLBodyWordCount(document.getElementById('cl-body-input'));
}

function updateCLBodyWordCount(ta) {
    if (!ta) return;
    const wc = ta.value.trim().split(/\s+/).filter(Boolean).length;
    const el = document.getElementById('cl-wc');
    if (el) el.textContent = `${wc} words`;
}

function updateCL(section, key, val) {
    if (!clData) return;
    clData[section][key] = val;
    renderCoverLetterPreview();
    autoSaveCoverLetter();
}
function setCLTemplate(id) {
    if (!clData) return;
    clData.meta.templateId = id;
    renderCLForm();
    renderCoverLetterPreview();
    autoSaveCoverLetter();
}

let lastSavedAtCL = null;
function autoSaveCoverLetter() {
    if (!clData || !currentClId) return;
    allCoverLetters[currentClId] = clData;
    saveAllCoverLetters();
    lastSavedAtCL = Date.now();
    updateAutosaveLabelCL();
    const dot = document.getElementById('cl-save-dot');
    if (dot) { dot.classList.add('saving'); setTimeout(()=>dot.classList.remove('saving'),600); }
}
function updateAutosaveLabelCL() {
    const el = document.getElementById('cl-autosave-label');
    if (!el) return;
    if (!lastSavedAtCL) { el.textContent = 'Not saved yet'; return; }
    const secs = Math.round((Date.now() - lastSavedAtCL) / 1000);
    if (secs < 3) el.textContent = 'Saved just now';
    else if (secs < 60) el.textContent = `Saved ${secs}s ago`;
    else { const mins = Math.round(secs / 60); el.textContent = mins === 1 ? 'Saved 1 min ago' : `Saved ${mins} min ago`; }
}
setInterval(updateAutosaveLabelCL, 1000);

function renderCoverLetterPreview() {
    const root = document.getElementById('cl-preview-root');
    if (!root || !clData) return;
    root.innerHTML = renderCoverLetter(clData, clData.meta.templateId);
}

function renderCoverLetter(data, tid) {
    const { sender, recipient, letter } = data;
    const bodyHtml = (letter.body || '').split(/\n{2,}/).map(p => p.trim()).filter(Boolean)
        .map(p => `<p>${escHtml(p)}</p>`).join('') || '<p class="empty-note">Start writing your letter…</p>';
    const recipientHtml = `<div class="cl-recipient">
        ${recipient.hiringManager ? `<p>${escHtml(recipient.hiringManager)}</p>` : ''}
        ${recipient.company ? `<p>${escHtml(recipient.company)}</p>` : ''}
        ${recipient.companyAddress ? `<p>${escHtml(recipient.companyAddress)}</p>` : ''}
    </div>`;
    const refLine = letter.jobTitle ? `<p class="cl-refline">Re: Application for ${escHtml(letter.jobTitle)}</p>` : '';

    if (tid === 'cl-02') {
        return `<div class="cl-modern-header">
                <p class="cl-modern-name">${escHtml(sender.fullName)}</p>
                <p class="cl-modern-meta">${[sender.email, sender.phone, sender.location].filter(Boolean).map(escHtml).join(' · ')}</p>
            </div>
            <p class="cl-date">${escHtml(letter.date)}</p>
            ${recipientHtml}${refLine}
            <p class="cl-greeting">${escHtml(letter.greeting)}</p>
            <div class="cl-body">${bodyHtml}</div>
            <p class="cl-closing">${escHtml(letter.closing)}</p>
            <p class="cl-signoff-name" style="color:var(--color-accent-cl,#2F6F63)">${escHtml(sender.fullName)}</p>`;
    }
    return `<div class="cl-sender">
            <p class="cl-sender-name">${escHtml(sender.fullName)}</p>
            <p class="cl-sender-meta">${[sender.email, sender.phone, sender.location].filter(Boolean).map(escHtml).join(' · ')}</p>
        </div>
        <p class="cl-date">${escHtml(letter.date)}</p>
        ${recipientHtml}${refLine}
        <p class="cl-greeting">${escHtml(letter.greeting)}</p>
        <div class="cl-body">${bodyHtml}</div>
        <p class="cl-closing">${escHtml(letter.closing)}</p>
        <p class="cl-signoff-name">${escHtml(sender.fullName)}</p>`;
}

const NAV_VIEWS = ['landing', 'gallery', 'builder', 'manager', 'clbuilder'];
function hashToView(hash) {
    const v = (hash || '').replace(/^#/, '');
    return NAV_VIEWS.includes(v) ? v : 'landing';
}

// ─── Page meta config ────────────────────────────────────────────────────────

const PAGE_META = {
  landing: {
    title: 'Mellow CV Factory | Professional Resume Builder',
    description: 'Build a professional, ATS-ready resume in minutes with expert templates and AI-powered writing assistance. Free, no account needed.',
    url: 'https://resume-factory-brown.vercel.app/',
  },
  gallery: {
    title: 'Resume Templates | Mellow CV Factory',
    description: 'Browse 43 professional resume templates — modern, ATS-friendly, executive, creative, student, and trade layouts.',
    url: 'https://resume-factory-brown.vercel.app/gallery',
  },
  manager: {
    title: 'My Resumes | Mellow CV Factory',
    description: 'View, edit, and manage all your saved resumes and cover letters in one place.',
    url: 'https://resume-factory-brown.vercel.app/manager',
  },
  builder: {
    title: 'Build Your Resume | Mellow CV Factory',
    description: 'Create a polished, ATS-ready resume with AI writing help, live preview, and one-click PDF download.',
    url: 'https://resume-factory-brown.vercel.app/builder',
  },
  clbuilder: {
    title: 'Cover Letter Builder | Mellow CV Factory',
    description: 'Write a professional cover letter in minutes with AI assistance and a live preview.',
    url: 'https://resume-factory-brown.vercel.app/cover-letter',
  },
};

const VIEW_TO_PATH = {
  landing:   '/',
  gallery:   '/gallery',
  manager:   '/manager',
  builder:   '/builder',
  clbuilder: '/cover-letter',
};

const PATH_TO_VIEW = {
  '/':             'landing',
  '/gallery':      'gallery',
  '/manager':      'manager',
  '/builder':      'builder',
  '/cover-letter': 'clbuilder',
};

function setMeta(attr, key, value) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function updatePageMeta(view) {
  const meta = PAGE_META[view] || PAGE_META.landing;
  document.title = meta.title;
  setMeta('name',     'description',       meta.description);
  setMeta('property', 'og:title',          meta.title);
  setMeta('property', 'og:description',    meta.description);
  setMeta('property', 'og:url',            meta.url);
  setMeta('name',     'twitter:title',     meta.title);
  setMeta('name',     'twitter:description', meta.description);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = meta.url;
}

// ─── navigate() ──────────────────────────────────────────────────────────────

function navigate(view, opts = {}) {
  // YOUR original logic — untouched
  closeMobilePreview();
  document.body.setAttribute('data-view', view);
  if (view === 'manager') renderManager();
  if (view === 'builder') { if (!cvData) loadData(); renderPreview(); setStep(currentStep); updatePaLabel(); }
  if (view === 'clbuilder') {
    if (!clData) {
      const ids = Object.keys(allCoverLetters);
      if (ids.length) { currentClId = ids[0]; clData = allCoverLetters[currentClId]; }
    }
    if (clData) { renderCLForm(); renderCoverLetterPreview(); updateAutosaveLabelCL(); }
    else {
      const fp = document.getElementById('cl-form-panel');
      const pr = document.getElementById('cl-preview-root');
      if (fp) fp.innerHTML = '<p style="padding:20px;color:var(--t3)">No cover letter selected. <a onclick="navigate(\'manager\')" style="cursor:pointer;color:var(--accent)">Go to My Resumes</a> to create one.</p>';
      if (pr) pr.innerHTML = '';
    }
  }
  if (view === 'gallery') renderGallery();
  if (view === 'landing') { renderHeroCv(); renderShowcaseStrip(); }
  window.scrollTo(0, 0);
  if (atsPanelOpen) { atsPanelOpen = false; document.getElementById('ats-panel').classList.remove('open'); }
  closeTips();
  closeQuickFab();
  closeImportModal();
  document.getElementById('preview-area').classList.remove('preview-full');

  // NEW: real URL paths instead of hashes + meta update
  if (!opts.skipHistory) {
    const path = VIEW_TO_PATH[view] || '/';
    if (window.location.pathname !== path) {
      history.pushState({ view }, '', path);
    }
  }
  updatePageMeta(view);
}

// ─── Back / forward button support ───────────────────────────────────────────

window.addEventListener('popstate', (e) => {
  const view = (e.state && e.state.view)
    ? e.state.view
    : PATH_TO_VIEW[window.location.pathname] || 'landing';
  navigate(view, { skipHistory: true });
});

// ─── On first load: resolve view from URL path ────────────────────────────────

(function initViewFromURL() {
  const view = PATH_TO_VIEW[window.location.pathname] || 'landing';
  document.body.setAttribute('data-view', view);
  updatePageMeta(view);
  history.replaceState({ view }, '', window.location.pathname);
})();

window.addEventListener('popstate', (e) => {
    const view = (e.state && e.state.view) || hashToView(location.hash);
    navigate(view, { skipHistory: true });
});

// Categorized tips per editor step. Each step has a short intro plus tips
// grouped by category (Writing / ATS / Formatting / Mistakes to avoid) —
// only the categories relevant to that step are included, so some steps
// have 2 categories and some have 4.
const TIPS_CONTENT = {
    0: { title: "Personal Details & Summary", groups: [
        { cat: "Writing", tips: [
            "Aim for 40–80 words: your experience level, 2–3 top skills, and what you're looking for.",
            "Mention your target job title in the summary — it's the fastest way for a recruiter (and an ATS) to place you."
        ]},
        { cat: "ATS", tips: [
            "Use a real email address and phone number in a standard format — ATS parsers look for these first."
        ]},
        { cat: "Mistakes to avoid", tips: [
            "Avoid generic filler like \"hard-working team player\" with nothing to back it up — save specifics for your bullets.",
            "Don't write in the third person or use \"I\" — CV summaries are usually written without pronouns."
        ]}
    ]},
    1: { title: "Work Experience", groups: [
        { cat: "Writing", tips: [
            "Start each bullet with a strong action verb: Led, Built, Reduced, Managed, Delivered.",
            "Put your strongest, most relevant bullet first in each role — recruiters skim top-down."
        ]},
        { cat: "ATS", tips: [
            "Mirror keywords and phrasing from the job ad where it's genuinely true of your experience."
        ]},
        { cat: "Formatting", tips: [
            "3–5 bullets per role is the sweet spot. Drag bullets to reorder them within a role."
        ]},
        { cat: "Mistakes to avoid", tips: [
            "Don't just list duties — show outcomes. \"Handled customer queries\" is weaker than \"Resolved 10+ queries per shift, lifting satisfaction 15%.\"",
            "Avoid vague numbers-free claims when a real number is available — even an estimate is more convincing than none."
        ]}
    ]},
    2: { title: "Education & Projects", groups: [
        { cat: "Writing", tips: [
            "Only include coursework or projects that are relevant to the role you're targeting.",
            "For projects, briefly say what you built and what impact or result it had."
        ]},
        { cat: "Formatting", tips: [
            "List your most recent qualification first."
        ]},
        { cat: "Mistakes to avoid", tips: [
            "Once you have 2+ years of work experience, your matric year and school-level detail matter less — keep it brief."
        ]}
    ]},
    3: { title: "Skills & Languages", groups: [
        { cat: "Writing", tips: [
            "Order skills so the most job-relevant ones appear first — don't just list them alphabetically."
        ]},
        { cat: "ATS", tips: [
            "Use the exact skill name the job ad uses (e.g. \"Microsoft Excel\" not \"MS Excel\") if that's what they wrote — exact-match keywords score better."
        ]},
        { cat: "Mistakes to avoid", tips: [
            "\"Hard worker\" and \"good communicator\" are traits, not skills — those belong in your summary, not your skills list.",
            "Don't claim \"Expert\" level unless you could defend it in an interview."
        ]}
    ]},
    4: { title: "Extra Sections", groups: [
        { cat: "Writing", tips: [
            "Only add a References section if the job ad asks for it — \"References available on request\" wastes space otherwise.",
            "Interests are optional. Only include ones that say something useful (leadership, teamwork, a relevant hobby)."
        ]},
        { cat: "Mistakes to avoid", tips: [
            "Skip personal details like ID number or marital status unless local convention or the application specifically asks for them."
        ]}
    ]},
    5: { title: "Design & Theme", groups: [
        { cat: "Formatting", tips: [
            "Stick to one accent colour and the template's default fonts — consistency reads as more professional than variety."
        ]},
        { cat: "ATS", tips: [
            "If you're applying through a large company's online system, prefer an \"ATS\" or \"Practical\" category template — heavy multi-column or graphic layouts can scramble automated parsing."
        ]},
        { cat: "Mistakes to avoid", tips: [
            "Don't shrink the font below a comfortable reading size just to fit one page — trim content instead."
        ]}
    ]},
    6: { title: "AI Tools & ATS Check", groups: [
        { cat: "ATS", tips: [
            "Paste the actual job description into the keyword-match box — generic \"improve my CV\" prompts miss role-specific keywords.",
            "Missing keywords aren't automatically bad — only add ones that are honestly true of your experience."
        ]},
        { cat: "Writing", tips: [
            "Use AI suggestions as a starting point, then edit them into your own voice — recruiters can spot generic AI phrasing."
        ]},
        { cat: "Mistakes to avoid", tips: [
            "Don't apply an AI rewrite that overstates what you did — stick with the version that's most specific and still true."
        ]}
    ]}
};

function toggleTips() {
    const modal = document.getElementById('tips-modal');
    if (!modal) return;
    modal.classList.toggle('open');
    if (modal.classList.contains('open')) renderTipsModal();
}
function renderTipsModal() {
    const titleEl = document.getElementById('tips-modal-title');
    const body = document.getElementById('tips-modal-body');
    if (!body) return;
    const entry = TIPS_CONTENT[currentStep];
    if (!entry) { body.innerHTML = `<p>Select a tab for tips.</p>`; return; }
    if (titleEl) titleEl.textContent = `Tips: ${entry.title}`;
    body.innerHTML = entry.groups.map(g => `
        <p class="tip-cat">${escHtml(g.cat)}</p>
        <ul class="tip-list">${g.tips.map(t => `<li>${escHtml(t)}</li>`).join("")}</ul>
    `).join("");
}
function closeTips() {
    const modal = document.getElementById('tips-modal');
    if (modal) modal.classList.remove('open');
}

function openImportModal() {
    const modal = document.getElementById('import-modal');
    if (!modal) return;
    document.getElementById('import-status').innerHTML = '';
    document.getElementById('import-file-input').value = '';
    modal.classList.add('open');
}
function closeImportModal() {
    const modal = document.getElementById('import-modal');
    if (modal) modal.classList.remove('open');
}

function toggleMobilePreview() { isMobilePreviewOpen ? closeMobilePreview() : openMobilePreview(); }

let mobilePreviewZoom = null;

function openMobilePreview() {
    isMobilePreviewOpen = true;
    const overlay = document.getElementById('preview-slide-overlay');
    if (overlay) overlay.classList.add('open');
    renderMobilePreview();
}

function closeMobilePreview() {
    isMobilePreviewOpen = false;
    const overlay = document.getElementById('preview-slide-overlay');
    if (overlay) overlay.classList.remove('open');
}

function getMobilePreviewBox() {
    return document.querySelector('#preview-slide-body .mobile-preview-scale-box');
}

function applyMobilePreviewZoom() {
    const body = document.getElementById('preview-slide-body');
    const box = getMobilePreviewBox();
    if (!body || !box) return;
    const stack = box.querySelector('.resume-pages');
    if (!stack) return;

    const zoom = mobilePreviewZoom ?? 1;
    const naturalWidth = Math.max(stack.scrollWidth || 0, stack.getBoundingClientRect().width || 0, 794);
    const naturalHeight = Math.max(stack.scrollHeight || 0, stack.getBoundingClientRect().height || 1123);

    box.style.width = '210mm';
    box.style.minWidth = '210mm';
    box.style.height = `${naturalHeight * zoom}px`;
    box.style.transformOrigin = 'top center';
    box.style.transform = `scale(${zoom})`;

    const label = document.getElementById('mobile-preview-zoom-label');
    if (label) label.textContent = mobilePreviewZoom == null ? 'Fit' : `${Math.round(zoom * 100)}%`;

    box.style.marginLeft = `${Math.max(0, (body.clientWidth - naturalWidth * zoom) / 2)}px`;
    box.style.marginRight = `${Math.max(0, (body.clientWidth - naturalWidth * zoom) / 2)}px`;
}

function fitMobilePreviewToFit() {
    const body = document.getElementById('preview-slide-body');
    const box = getMobilePreviewBox();
    if (!body || !box) return;
    const stack = box.querySelector('.resume-pages');
    if (!stack) return;

    const naturalWidth = Math.max(stack.scrollWidth || 0, stack.getBoundingClientRect().width || 0, 794);
    const available = Math.max(240, body.clientWidth - 16);
    mobilePreviewZoom = Math.min(1, Math.max(0.3, available / naturalWidth));
    applyMobilePreviewZoom();
}

function setMobilePreviewZoom(value) {
    mobilePreviewZoom = Math.min(1.5, Math.max(0.3, Number(value) || 1));
    applyMobilePreviewZoom();
}

function changeMobilePreviewZoom(delta) {
    if (mobilePreviewZoom == null) fitMobilePreviewToFit();
    setMobilePreviewZoom(mobilePreviewZoom + delta);
}

function renderMobilePreview() {
    const body = document.getElementById('preview-slide-body');
    if (!body || !cvData) return;

    const canonicalStack = document.querySelector('#cv-root .resume-pages');
    if (!canonicalStack) return;

    // Clone the complete canonical A4 page stack. The document remains fixed A4;
    // the mobile viewer scales the stack instead of changing its internal layout.
    const box = document.createElement('div');
    box.className = 'mobile-preview-scale-box';
    const clone = canonicalStack.cloneNode(true);
    clone.querySelectorAll('.rf-a4-page').forEach(page => {
        page.style.transform = '';
        page.style.transformOrigin = '';
        page.style.width = '210mm';
        page.style.minWidth = '210mm';
        page.style.maxWidth = '210mm';
        page.style.height = '297mm';
        page.style.minHeight = '297mm';
        page.style.maxHeight = '297mm';
    });
    box.appendChild(clone);
    body.replaceChildren(box);

    requestAnimationFrame(() => {
        if (mobilePreviewZoom == null) fitMobilePreviewToFit();
        else applyMobilePreviewZoom();
    });
}

function updateMobilePreview() {
    if (isMobilePreviewOpen) renderMobilePreview();
}


let previewZoom = null;
function getPreviewDocument() {
    return document.querySelector('#cv-root .rf-resume-document');
}
function applyPreviewZoom() {
    const wrapper = document.getElementById('preview-wrapper');
    const box = wrapper?.querySelector('.preview-scale-box');
    const doc = getPreviewDocument();
    if (!wrapper || !box || !doc) return;
    const zoom = previewZoom ?? 1;
    const natural = Math.max(doc.getBoundingClientRect().height, doc.scrollHeight || 0, 1123);
    box.style.transformOrigin = 'top center';
    box.style.transform = `scale(${zoom})`;
    box.style.width = '210mm';
    box.style.height = `${natural * zoom}px`;
    box.style.marginBottom = '0';
    const label = document.getElementById('preview-zoom-label');
    if (label) label.textContent = previewZoom == null ? 'Fit' : `${Math.round(zoom * 100)}%`;
}
function fitPreviewZoom() {
    const wrapper = document.getElementById('preview-wrapper');
    const doc = getPreviewDocument();
    if (!wrapper || !doc) return;
    const available = Math.max(240, wrapper.getBoundingClientRect().width - 28);
    const naturalWidth = Math.max(1, doc.getBoundingClientRect().width);
    previewZoom = Math.min(1, Math.max(0.38, available / naturalWidth));
    applyPreviewZoom();
}
function setPreviewZoom(value) {
    previewZoom = Math.min(1.5, Math.max(0.38, Number(value) || 1));
    applyPreviewZoom();
}
function changePreviewZoom(delta) {
    if (previewZoom == null) fitPreviewZoom();
    setPreviewZoom(previewZoom + delta);
}
function scalePreviewToFit() {
    if (previewZoom == null) fitPreviewZoom();
    else applyPreviewZoom();
}

function renderPreview(pageEl) {
    const el = pageEl || document.getElementById('cv-root');
    if (!el) return;
    const tid = currentTemplateId;
    el.setAttribute('data-template', tid);

    const ov = cvData.meta.themeOverrides || {};
    const accentColor = ov.primaryColor || getTemplateDefaultColor(tid);
    el.style.setProperty('--color-accent', accentColor);
    if (ov.paperColor) el.style.setProperty('--color-paper', ov.paperColor);
    else el.style.removeProperty('--color-paper');
    el.style.setProperty('--scale', ov.fontSizeScale || 1);
    el.style.setProperty('--spacing', ov.spacingScale || 1);

    if (typeof window.__RF_SET_PREVIEW__ === 'function') {
        window.__RF_SET_PREVIEW__(cvData, tid);
    } else {
        el.innerHTML = `<div class="a4-page rf-a4-page"><div class="rf-page-content"><div class="page" data-template="${escHtml(tid)}">${renderTemplateContent(cvData, tid)}</div></div></div>`;
    }

    updateMobilePreview();
    updateStatusBar();
    requestAnimationFrame(() => requestAnimationFrame(scalePreviewToFit));
}

function getTemplateDefaultColor(tid) {
    const definition = typeof getTemplateDefinition === 'function'
        ? getTemplateDefinition(tid)
        : null;
    return (definition && definition.accentColor) || "#2F6F63";
}

function setStep(n) {
    currentStep = n;
    document.querySelectorAll('.ep-tab').forEach(t => t.classList.toggle('active', +t.dataset.step === n));
    document.getElementById('ep-body').innerHTML = stepContent(n);
    if (n === 5 && typeof initTemplatePickerThumbs === 'function') requestAnimationFrame(initTemplatePickerThumbs);
    wireStepEvents();
    const tipsModal = document.getElementById('tips-modal');
    if (tipsModal && tipsModal.classList.contains('open')) renderTipsModal();
}
function stepContent(n) {
    if (!cvData) return "";
    switch (n) {
        case 0: return stepPersonal(cvData.personalDetails);
        case 1: return stepSection("experience");
        case 2: return stepSection("education") + stepSection("projects");
        case 3: return stepSection("skills") + stepSection("languages") + stepSection("certificates");
        case 4: return stepSection("custom") + stepSection("strengths") + stepSection("interests") + stepSection("references") + stepSection("personal-info");
        case 5: return stepDesign();
        case 6: return stepAI();
        default: return "";
    }
}
function stepPersonal(p) {
        const wc = (p.summary || "").trim().split(/\s+/).filter(Boolean).length;
        const cls = wc >= 40 && wc <= 80 ? "good" : wc > 80 ? "bad" : "warn";
        return `
        <p class="ep-sh">Personal Details</p>
        <div class="photo-row">
            <div class="photo-ring">${p.photo ? `<img src="${p.photo}" alt="Photo">` : `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`}</div>
            <div class="photo-actions">
                <p>Profile photo (optional)</p>
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                    <button class="btn-upload" onclick="document.getElementById('photo-upload').click()">Upload Photo</button>
                    ${p.photo ? `<button class="btn-photo-rm" onclick="removePhoto()">Remove</button>` : ""}
                </div>
            </div>
        </div>
        <input type="file" id="photo-upload" accept="image/*" style="display:none" onchange="handlePhotoUpload(this)">
        <div class="f"><label>Full Name</label><input value="${escHtml(p.fullName)}" oninput="updatePD('fullName',this.value)"></div>
        <div class="f"><label>Job Title / Target Role</label><input value="${escHtml(p.jobTitle)}" oninput="updatePD('jobTitle',this.value)"></div>
        <div class="f-row">
            <div class="f"><label>Email</label><input type="email" value="${escHtml(p.email)}" oninput="updatePD('email',this.value)"></div>
            <div class="f"><label>Phone</label><input type="tel" value="${escHtml(p.phone)}" oninput="updatePD('phone',this.value)"></div>
        </div>
        <div class="f"><label>Location</label><input value="${escHtml(p.location)}" oninput="updatePD('location',this.value)"></div>
        <div class="f">
            <div class="f-hd">
                <label>Professional Summary</label>
                <span class="word-count ${cls}">${wc} words</span>
            </div>
            <textarea rows="4" oninput="updatePD('summary',this.value);updateWordCount(this)">${escHtml(p.summary)}</textarea>
${wc < 30 ? `<div class="weak-hint">💡 Aim for 40-80 words. Describe your experience level, key skills, and what you bring.</div>` : ""}
<button class="btn-ai" onclick="aiImproveSummaryInline(this)">✨ AI Improve Summary</button>
<div class="ai-inline-panel" id="ai-summary-panel"></div>
</div>
        <p class="ep-sh">Links (optional)</p>
        ${(p.links || []).map((l, i) => `
        <div class="f-row">
            <div class="f"><label>Label</label><input value="${escHtml(l.label || '')}" oninput="updateLink(${i},'label',this.value)" placeholder="e.g. LinkedIn"></div>
            <div class="f"><label>URL</label><input value="${escHtml(l.url)}" oninput="updateLink(${i},'url',this.value)" placeholder="https://"></div>
            <button class="btn-del" style="align-self:flex-end;margin-bottom:8px" onclick="removeLink(${i})">✕</button>
        </div>`).join("")}
        <button class="btn-add" onclick="addLink()">+ Add link</button>`;
    }

    function stepSection(type) {
        const sec = cvData.sections.find(s => s.type === type);
        if (!sec) return `<button class="btn-add" onclick="addSection('${type}')">+ Add ${humanType(type)} section</button>`;
        const vis = sec.visible;
        let itemsHtml = "";
        if (type === "experience")    itemsHtml = sec.items.map((it, i) => expCard(it, i)).join("");
        if (type === "education")     itemsHtml = sec.items.map((it, i) => eduCard(it, i)).join("");
        if (type === "projects")      itemsHtml = sec.items.map((it, i) => projCard(it, i)).join("");
        if (type === "custom")        itemsHtml = sec.items.map((it, i) => customCard(it, i)).join("");
        if (type === "skills")        itemsHtml = sec.items.map((it, i) => skillCard(it, i)).join("");
        if (type === "languages")     itemsHtml = sec.items.map((it, i) => langCard(it, i)).join("");
        if (type === "certificates")  itemsHtml = sec.items.map((it, i) => certCard(it, i)).join("");
        if (type === "references")    itemsHtml = sec.items.map((it, i) => refCard(it, i)).join("");
        if (type === "interests")     itemsHtml = sec.items.map((it, i) => interestCard(it, i)).join("");
        if (type === "strengths")     itemsHtml = sec.items.map((it, i) => strengthCard(it, i)).join("");
        if (type === "personal-info") itemsHtml = sec.items.map((it, i) => piCard(it, i)).join("");
        return `
        <div class="sb-hd">
            <span class="t">${escHtml(sec.title)}</span>
            <div class="sb-ctrls">
                <button class="btn-vis ${vis ? "on" : ""}" onclick="toggleSecVis('${type}')">${vis ? "Shown" : "Hidden"}</button>
                <button class="btn-ico" onclick="moveSec('${type}',-1)" title="Move up">↑</button>
                <button class="btn-ico" onclick="moveSec('${type}',1)" title="Move down">↓</button>
                <button class="btn-ico" onclick="renameSection('${type}')" title="Rename">✏️</button>
            </div>
        </div>
        <div id="items-${type}">${itemsHtml}</div>
        <button class="btn-add" onclick="addItem('${type}')">+ Add ${humanType(type)}</button>`;
    }

    function humanType(t) {
        const m = { experience:"Experience", education:"Education", projects:"Project", custom:"Activity", skills:"Skill", languages:"Language", certificates:"Certificate", references:"Reference", interests:"Interests", strengths:"Strength", "personal-info":"Info" };
        return m[t] || t;
    }

    function datePicker(prefix, field, value) {
        const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const [y, m] = (value || "").split("-");
        const yearOpts = ["<option value=''>Year</option>"];
        for (let yr = new Date().getFullYear() + 2; yr >= 1970; yr--) {
            yearOpts.push(`<option value="${yr}" ${yr == y ? "selected" : ""}>${yr}</option>`);
        }
        const monthOpts = months.map((mn, idx) =>
            idx === 0 ? "<option value=''>Month</option>" : `<option value="${String(idx).padStart(2,'0')}" ${String(idx).padStart(2,'0') === m ? "selected" : ""}>${mn}</option>`
        ).join("");
        return `<div class="date-picker"><select onchange="updateDateField('${prefix}','${field}','year',this.value)">${yearOpts.join("")}</select><select onchange="updateDateField('${prefix}','${field}','month',this.value)">${monthOpts}</select></div>`;
    }

   function expCard(it, i) {
    const bullets = it.bullets || [];
    const hasWeak = bullets.some(b => b.length > 0 && b.length < 30);
    return `
    <div class="icard" draggable="true" data-type="experience" data-idx="${i}">
        <div class="icard-top">
            <span class="icard-lbl">${escHtml(it.role || "New Role")}</span>
            <div class="icard-ctrls">
                <button class="btn-ico" onclick="moveItem('experience',${i},-1)" title="Move up">↑</button>
                <button class="btn-ico" onclick="moveItem('experience',${i},1)" title="Move down">↓</button>
                <button class="btn-del" onclick="delItem('experience',${i})">Delete</button>
            </div>
        </div>
        <div class="f"><label>Job Title</label><input value="${escHtml(it.role)}" oninput="updateItem('experience',${i},'role',this.value)"></div>
        <div class="f-row">
            <div class="f"><label>Company</label><input value="${escHtml(it.company)}" oninput="updateItem('experience',${i},'company',this.value)"></div>
            <div class="f"><label>Location</label><input value="${escHtml(it.location)}" oninput="updateItem('experience',${i},'location',this.value)"></div>
        </div>
        <div class="f-row">
            <div class="f"><label>Start Date</label>${datePicker(`experience-${i}`, "startDate", it.startDate)}</div>
            <div class="f"><label>End Date</label>${it.current ? "<p style='font-size:12px;color:var(--accent);padding-top:8px'>Present</p>" : datePicker(`experience-${i}`, "endDate", it.endDate)}</div>
        </div>
        <div class="f-check"><label><input type="checkbox" ${it.current ? "checked" : ""} onchange="updateItem('experience',${i},'current',this.checked);setStep(1)"> Currently working here</label></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin:8px 0 4px">
            <label style="font-size:11px;font-weight:600;color:var(--t2)">Bullet Points</label>
            <button class="btn-ai" onclick="aiImproveInline('experience',${i},this)" ${bullets.length ? "" : "disabled"}>✨ AI Improve</button>
        </div>
        ${hasWeak ? `<div class="weak-hint">💡 Some bullets are short. Add specific achievements and numbers for more impact.</div>` : ""}
        <div class="bullet-list" id="bullets-experience-${i}">${bullets.map((b, j) => bulletRow(b, j, "experience", i, bullets.length)).join("")}</div>
        <button class="btn-add" style="margin-top:0" onclick="addBullet('experience',${i})">+ Add bullet</button>
        <div class="ai-inline-panel" id="ai-panel-experience-${i}"></div>
    </div>`;
}

    function eduCard(it, i) {
        return `
        <div class="icard" draggable="true" data-type="education" data-idx="${i}">
            <div class="icard-top">
                <span class="icard-lbl">${escHtml(it.qualification || "New Qualification")}</span>
                <div class="icard-ctrls">
                    <button class="btn-ico" onclick="moveItem('education',${i},-1)" title="Move up">↑</button>
                    <button class="btn-ico" onclick="moveItem('education',${i},1)" title="Move down">↓</button>
                    <button class="btn-del" onclick="delItem('education',${i})">Delete</button>
                </div>
            </div>
            <div class="f"><label>Qualification</label><input value="${escHtml(it.qualification)}" oninput="updateItem('education',${i},'qualification',this.value)"></div>
            <div class="f-row">
                <div class="f"><label>Institution</label><input value="${escHtml(it.institution)}" oninput="updateItem('education',${i},'institution',this.value)"></div>
                <div class="f"><label>Location</label><input value="${escHtml(it.location)}" oninput="updateItem('education',${i},'location',this.value)"></div>
            </div>
            <div class="f-row">
                <div class="f"><label>Start Date</label>${datePicker(`education-${i}`, "startDate", it.startDate)}</div>
                <div class="f"><label>End Date</label>${it.current ? "<p style='font-size:12px;color:var(--accent);padding-top:8px'>Present</p>" : datePicker(`education-${i}`, "endDate", it.endDate)}</div>
            </div>
            <div class="f-check"><label><input type="checkbox" ${it.current ? "checked" : ""} onchange="updateItem('education',${i},'current',this.checked);setStep(2)"> Currently studying</label></div>
            <div class="f"><label>Notes (honours, distinctions, coursework)</label><textarea rows="2" oninput="updateItem('education',${i},'notes',this.value)">${escHtml(it.notes)}</textarea></div>
        </div>`;
    }

    function projCard(it, i) {
    return `
    <div class="icard" draggable="true" data-type="projects" data-idx="${i}">
        <div class="icard-top">
            <span class="icard-lbl">${escHtml(it.name || "New Project")}</span>
            <div class="icard-ctrls">
                <button class="btn-ico" onclick="moveItem('projects',${i},-1)" title="Move up">↑</button>
                <button class="btn-ico" onclick="moveItem('projects',${i},1)" title="Move down">↓</button>
                <button class="btn-del" onclick="delItem('projects',${i})">Delete</button>
            </div>
        </div>
        <div class="f"><label>Project Name</label><input value="${escHtml(it.name)}" oninput="updateItem('projects',${i},'name',this.value)"></div>
        <div class="f"><label>URL (optional)</label><input value="${escHtml(it.url)}" oninput="updateItem('projects',${i},'url',this.value)" placeholder="https://"></div>
        <div class="f-row">
           
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin:8px 0 4px">
            <label style="font-size:11px;font-weight:600;color:var(--t2)">Bullet Points</label>
            <button class="btn-ai" onclick="aiImproveInline('projects',${i},this)" ${(it.bullets||[]).length ? "" : "disabled"}>✨ AI Improve</button>
        </div>
        <div class="bullet-list" id="bullets-projects-${i}">${(it.bullets || []).map((b, j) => bulletRow(b, j, "projects", i, (it.bullets||[]).length)).join("")}</div>
        <button class="btn-add" style="margin-top:0" onclick="addBullet('projects',${i})">+ Add bullet</button>
        <div class="ai-inline-panel" id="ai-panel-projects-${i}"></div>
    </div>`;
}

function customCard(it, i) {
    return `
    <div class="icard" draggable="true" data-type="custom" data-idx="${i}">
        <div class="icard-top">
            <span class="icard-lbl">${escHtml(it.title || "Activity")}</span>
            <div class="icard-ctrls">
                <button class="btn-ico" onclick="moveItem('custom',${i},-1)" title="Move up">↑</button>
                <button class="btn-ico" onclick="moveItem('custom',${i},1)" title="Move down">↓</button>
                <button class="btn-del" onclick="delItem('custom',${i})">Delete</button>
            </div>
        </div>
        <div class="f"><label>Title</label><input value="${escHtml(it.title)}" oninput="updateItem('custom',${i},'title',this.value)"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin:8px 0 4px">
            <label style="font-size:11px;font-weight:600;color:var(--t2)">Bullet Points</label>
            <button class="btn-ai" onclick="aiImproveInline('custom',${i},this)" ${(it.bullets||[]).length ? "" : "disabled"}>✨ AI Improve</button>
        </div>
        <div class="bullet-list" id="bullets-custom-${i}">${(it.bullets || []).map((b, j) => bulletRow(b, j, "custom", i, (it.bullets||[]).length)).join("")}</div>
        <button class="btn-add" style="margin-top:0" onclick="addBullet('custom',${i})">+ Add bullet</button>
        <div class="ai-inline-panel" id="ai-panel-custom-${i}"></div>
    </div>`;
}

    function skillCard(it, i) {
        return `
        <div class="icard" draggable="true" data-type="skills" data-idx="${i}">
            <div class="icard-top">
                <span class="icard-lbl">${escHtml(it.name || "Skill")}</span>
                <div class="icard-ctrls">
                    <button class="btn-ico" onclick="moveItem('skills',${i},-1)" title="Move up">↑</button>
                    <button class="btn-ico" onclick="moveItem('skills',${i},1)" title="Move down">↓</button>
                    <button class="btn-del" onclick="delItem('skills',${i})">Delete</button>
                </div>
            </div>
            <div class="f-row">
                <div class="f"><label>Skill</label><input value="${escHtml(it.name)}" oninput="updateItem('skills',${i},'name',this.value)"></div>
                <div class="f"><label>Level</label>
                    <select onchange="updateItem('skills',${i},'level',this.value)">
                        ${["Basic","Intermediate","Proficient","Advanced","Expert"].map(l => `<option ${it.level===l?"selected":""}>${l}</option>`).join("")}
                    </select>
                </div>
            </div>
        </div>`;
    }

    function langCard(it, i) {
        return `
        <div class="icard" draggable="true" data-type="languages" data-idx="${i}">
            <div class="icard-top">
                <span class="icard-lbl">${escHtml(it.name || "Language")}</span>
                <div class="icard-ctrls">
                    <button class="btn-ico" onclick="moveItem('languages',${i},-1)" title="Move up">↑</button>
                    <button class="btn-ico" onclick="moveItem('languages',${i},1)" title="Move down">↓</button>
                    <button class="btn-del" onclick="delItem('languages',${i})">Delete</button>
                </div>
            </div>
            <div class="f-row">
                <div class="f"><label>Language</label><input value="${escHtml(it.name)}" oninput="updateItem('languages',${i},'name',this.value)"></div>
                <div class="f"><label>Level</label>
                    <select onchange="updateItem('languages',${i},'level',this.value)">
                        ${["Basic","Conversational","Intermediate","Fluent","Native"].map(l => `<option ${it.level===l?"selected":""}>${l}</option>`).join("")}
                    </select>
                </div>
            </div>
        </div>`;
    }

    function certCard(it, i) {
        return `
        <div class="icard" draggable="true" data-type="certificates" data-idx="${i}">
            <div class="icard-top">
                <span class="icard-lbl">${escHtml(it.name || "Certificate")}</span>
                <div class="icard-ctrls">
                    <button class="btn-ico" onclick="moveItem('certificates',${i},-1)" title="Move up">↑</button>
                    <button class="btn-ico" onclick="moveItem('certificates',${i},1)" title="Move down">↓</button>
                    <button class="btn-del" onclick="delItem('certificates',${i})">Delete</button>
                </div>
            </div>
            <div class="f"><label>Certificate / Credential</label><input value="${escHtml(it.name)}" oninput="updateItem('certificates',${i},'name',this.value)"></div>
        </div>`;
    }

    function refCard(it, i) {
        return `
        <div class="icard" draggable="true" data-type="references" data-idx="${i}">
            <div class="icard-top">
                <span class="icard-lbl">${escHtml(it.name || "Reference")}</span>
                <div class="icard-ctrls">
                    <button class="btn-ico" onclick="moveItem('references',${i},-1)" title="Move up">↑</button>
                    <button class="btn-ico" onclick="moveItem('references',${i},1)" title="Move down">↓</button>
                    <button class="btn-del" onclick="delItem('references',${i})">Delete</button>
                </div>
            </div>
            <div class="f"><label>Name</label><input value="${escHtml(it.name)}" oninput="updateItem('references',${i},'name',this.value)"></div>
            <div class="f"><label>Title / Company</label><input value="${escHtml(it.title)}" oninput="updateItem('references',${i},'title',this.value)"></div>
            <div class="f-row">
                <div class="f"><label>Phone</label><input value="${escHtml(it.phone)}" oninput="updateItem('references',${i},'phone',this.value)"></div>
                <div class="f"><label>Email</label><input value="${escHtml(it.email)}" oninput="updateItem('references',${i},'email',this.value)"></div>
            </div>
        </div>`;
    }

    function interestCard(it, i) {
        return `
        <div class="icard" data-type="interests" data-idx="${i}">
            <div class="icard-top">
                <span class="icard-lbl">Interests</span>
                <button class="btn-del" onclick="delItem('interests',${i})">Delete</button>
            </div>
            <div class="f"><label>Interests (free text)</label><textarea rows="2" oninput="updateItem('interests',${i},'value',this.value)">${escHtml(it.value)}</textarea></div>
        </div>`;
    }

    function strengthCard(it, i) {
        return `
        <div class="icard" draggable="true" data-type="strengths" data-idx="${i}">
            <div class="icard-top">
                <span class="icard-lbl">${escHtml(it.value || "Strength")}</span>
                <div class="icard-ctrls">
                    <button class="btn-ico" onclick="moveItem('strengths',${i},-1)" title="Move up">↑</button>
                    <button class="btn-ico" onclick="moveItem('strengths',${i},1)" title="Move down">↓</button>
                    <button class="btn-del" onclick="delItem('strengths',${i})">Delete</button>
                </div>
            </div>
            <div class="f"><input value="${escHtml(it.value)}" oninput="updateItem('strengths',${i},'value',this.value)" placeholder="e.g. Reliable"></div>
        </div>`;
    }

    function piCard(it, i) {
        return `
        <div class="icard" draggable="true" data-type="personal-info" data-idx="${i}">
            <div class="icard-top">
                <span class="icard-lbl">${escHtml(it.label || "Detail")}</span>
                <div class="icard-ctrls">
                    <button class="btn-ico" onclick="moveItem('personal-info',${i},-1)" title="Move up">↑</button>
                    <button class="btn-ico" onclick="moveItem('personal-info',${i},1)" title="Move down">↓</button>
                    <button class="btn-del" onclick="delItem('personal-info',${i})">Delete</button>
                </div>
            </div>
            <div class="f-row">
                <div class="f"><label>Label</label><input value="${escHtml(it.label)}" oninput="updateItem('personal-info',${i},'label',this.value)" placeholder="e.g. Date of Birth"></div>
                <div class="f"><label>Value</label><input value="${escHtml(it.value)}" oninput="updateItem('personal-info',${i},'value',this.value)"></div>
            </div>
        </div>`;
    }

    function bulletRow(b, j, type, i, count) {
        // Reordering previously relied only on native HTML5 drag-and-drop
        // (draggable="true" + dragstart/dragover/drop below), which iOS
        // Safari and Android Chrome do not fire from a touch gesture at all —
        // so on a phone, bullets could be added and deleted but never
        // reordered. Item-level cards already had this exact ↑/↓ fallback
        // (see moveItem() above); bullets didn't, so this mirrors that.
        const isFirst = j === 0, isLast = count != null ? j === count - 1 : false;
        return `<div class="bullet-row" draggable="true" data-btype="${type}" data-bidx="${i}" data-bj="${j}">
            <span class="bullet-dot">•</span>
            <input class="bullet-input" value="${escHtml(b)}" oninput="updateBullet('${type}',${i},${j},this.value)" placeholder="Describe what you did and the impact…">
            <button class="bullet-move" onclick="moveBullet('${type}',${i},${j},-1)" title="Move up" ${isFirst ? "disabled" : ""}>↑</button>
            <button class="bullet-move" onclick="moveBullet('${type}',${i},${j},1)" title="Move down" ${isLast ? "disabled" : ""}>↓</button>
            <button class="bullet-rm" onclick="removeBullet('${type}',${i},${j})">✕</button>
        </div>`;
    }
    function stepDesign() {
        const ov = cvData.meta.themeOverrides || {};
        const cats = [...new Set(TEMPLATE_CONFIGS.map(t => t.cat))];
        let tmplHtml = "";
        cats.forEach(cat => {
            const group = TEMPLATE_CONFIGS.filter(t => t.cat === cat);
            tmplHtml += `<p style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--t3);margin:10px 0 5px">${cat}</p>
            <div class="tmpl-mini-grid">${group.map(t =>
                `<div class="tmpl-mini ${currentTemplateId===t.id?"sel":""}" onclick="selectTemplate('${t.id}')">
                    <div class="tmpl-mini-t" data-thumb-id="${t.id}"><div class="g-thumb-fallback">${SVGS[t.id] || ''}</div></div>
                    <div class="tmpl-mini-n">${t.name}</div>
                </div>`).join("")}
</div>`;
        });
        const currentAccent  = ov.primaryColor  || getTemplateDefaultColor(currentTemplateId);
        const currentPaper   = ov.paperColor    || "";
        const currentScale   = ov.fontSizeScale || 1;
        const currentSpacing = ov.spacingScale  || 1;
        return `
        <div class="design-sec">
            <p class="design-t">Template</p>
            <div style="max-height:300px;overflow-y:auto;padding-right:2px">${tmplHtml}</div>
        </div>
        <div class="design-sec">
            <p class="design-t">Accent Colour</p>
            <div class="c-swatches">
                ${ACCENT_COLORS.map(c => `<button class="c-sw ${currentAccent===c.v?"active":""}" style="background:${c.v}" title="${c.label}" onclick="setAccentColor('${c.v}')"></button>`).join("")}
                <label title="Custom colour" style="cursor:pointer">
                    <div class="c-sw" style="background:${currentAccent};border-style:dashed"></div>
                    <input type="color" value="${currentAccent}" style="display:none" oninput="setAccentColor(this.value)">
                </label>
            </div>
        </div>
        <div class="design-sec">
            <p class="design-t">Paper Colour</p>
            <div class="c-swatches">
                ${PAPER_COLORS.map(c => `<button class="paper-sw ${currentPaper===c?"active":""}" style="background:${c}" onclick="setPaperColor('${c}')"></button>`).join("")}
                <button class="paper-sw ${!currentPaper?"active":""}" style="background:#fff;border-style:dashed" onclick="setPaperColor('')" title="Default">↺</button>
            </div>
        </div>
        <div class="design-sec">
            <p class="design-t">Font Size</p>
            <div class="scale-row">
                ${[[0.85,"S"],[0.92,"M−"],[1,"M"],[1.08,"M+"],[1.15,"L"]].map(([v,l]) =>
                    `<button class="sc-btn ${currentScale==v?"active":""}" onclick="setScale(${v})">${l}</button>`).join("")}
            </div>
        </div>
        <div class="design-sec">
            <p class="design-t">Spacing</p>
            <div class="scale-row">
                ${[[0.85,"Compact"],[1,"Normal"],[1.15,"Airy"]].map(([v,l]) =>
                    `<button class="sc-btn ${currentSpacing==v?"active":""}" onclick="setSpacing(${v})">${l}</button>`).join("")}
            </div>
        </div>
        <div class="reset-row">
            <button class="btn-reset" onclick="resetDesign()">↺ Reset to template defaults</button>
        </div>`;
    }

    function stepAI() {
        return `
        <p class="ep-sh">AI Writing Tools</p>
        <div style="margin-bottom:12px">
            <p style="font-size:12px;color:var(--t2);margin:0 0 8px;line-height:1.5">Use AI to strengthen your resume content:</p>
            <div style="display:flex;flex-direction:column;gap:8px">
                <button class="btn btn-outline btn-sm" style="justify-content:flex-start" onclick="aiImproveSummary()">✨ Improve my summary</button>
                <button class="btn btn-outline btn-sm" style="justify-content:flex-start" onclick="aiSuggestBullets()">💡 Suggest stronger bullet points</button>
                <button class="btn btn-outline btn-sm" style="justify-content:flex-start" onclick="aiCheckATS()">📊 Full ATS analysis</button>
            </div>
        </div>
        <p class="ep-sh">ATS Keyword Match</p>
        <div class="ats-jd">
            <label>Paste a job description to check keyword match:</label>
            <textarea rows="4" placeholder="Paste job description here…" oninput="targetJD=this.value">${escHtml(targetJD)}</textarea>
            <p class="ats-note">Tip: copy the full job posting for best results.</p>
            <button class="btn btn-primary btn-sm" style="width:100%" onclick="runATSCheck()">Run ATS Check</button>
        </div>
        <p class="ep-sh" style="margin-top:16px">Role-Based Suggestions</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px">
            ${["Software Dev","Marketing","Admin","Sales","Finance","Design","Healthcare","Education"].map(r =>
                `<button class="btn btn-outline btn-sm" onclick="aiRoleSuggestions('${r}')">${r}</button>`).join("")}
        </div>
        <div id="ai-output" style="font-size:12px;color:var(--t2);line-height:1.6;min-height:40px"></div>`;
    }

    function wireStepEvents() {
        document.querySelectorAll('.icard[draggable="true"]').forEach(card => {
            card.addEventListener('dragstart', e => { card.classList.add('dragging'); e.dataTransfer.setData('text/plain', JSON.stringify({ type: card.dataset.type, idx: +card.dataset.idx })); });
            card.addEventListener('dragend',   () => card.classList.remove('dragging'));
            card.addEventListener('dragover',  e => { e.preventDefault(); card.classList.add('drag-over'); });
            card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
            card.addEventListener('drop', e => {
                e.preventDefault(); card.classList.remove('drag-over');
                const from = JSON.parse(e.dataTransfer.getData('text/plain'));
                if (from.type === card.dataset.type && from.idx !== +card.dataset.idx)
                    reorderItem(from.type, from.idx, +card.dataset.idx);
            });
        });
        document.querySelectorAll('.bullet-row[draggable="true"]').forEach(row => {
            row.addEventListener('dragstart', e => { row.classList.add('dragging'); e.dataTransfer.setData('text/plain', JSON.stringify({ btype: row.dataset.btype, bidx: +row.dataset.bidx, bj: +row.dataset.bj })); });
            row.addEventListener('dragend',   () => row.classList.remove('dragging'));
            row.addEventListener('dragover',  e => { e.preventDefault(); row.classList.add('drag-over'); });
            row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
            row.addEventListener('drop', e => {
                e.preventDefault(); row.classList.remove('drag-over');
                const from = JSON.parse(e.dataTransfer.getData('text/plain'));
                if (from.btype === row.dataset.btype && from.bidx === +row.dataset.bidx && from.bj !== +row.dataset.bj)
                    reorderBullet(from.btype, from.bidx, from.bj, +row.dataset.bj);
            });
        });
    }

    // ---------- DATA MUTATIONS ----------
    function updatePD(field, val) {
    commitEditorMutation(
        () => setP(cvData.personalDetails, field, val),
        { force: false, step: null }
    );
}
    function updateWordCount(ta) {
        const wc = ta.value.trim().split(/\s+/).filter(Boolean).length;
        const el = ta.closest('.f').querySelector('.word-count');
        if (el) { el.textContent = `${wc} words`; el.className = `word-count ${wc>=40&&wc<=80?"good":wc>80?"bad":"warn"}`; }
    }
    function addLink() {
        commitEditorMutation(() => {
            if (!cvData.personalDetails.links) cvData.personalDetails.links = [];
            cvData.personalDetails.links.push({ label:"", url:"" });
        }, { force: true, step: 0 });
    }
    function removeLink(i) {
        commitEditorMutation(() => {
            if (!Array.isArray(cvData.personalDetails.links) || i < 0 || i >= cvData.personalDetails.links.length) return false;
            cvData.personalDetails.links.splice(i, 1);
        }, { force: true, step: 0 });
    }
   function updateLink(i, field, v) {
    commitEditorMutation(() => {
        if (!cvData.personalDetails.links?.[i]) return false;
        cvData.personalDetails.links[i][field] = v;
    }, { force: false, step: null });
}
    function removePhoto() {
        commitEditorMutation(() => {
            if (!cvData.personalDetails.photo) return false;
            cvData.personalDetails.photo = null;
        }, { force: true, step: 0 });
    }
    function handlePhotoUpload(input) {
        const file = input.files[0]; if (!file) return;
        const r = new FileReader();
        r.onload = e => commitEditorMutation(() => { cvData.personalDetails.photo = e.target.result; }, { force: true, step: 0 });
        r.readAsDataURL(file);
    }
    function updateItem(type, i, field, val) {
        commitEditorMutation(() => {
            const sec = cvData.sections.find(s => s.type === type);
            if (!sec || !sec.items[i]) return false;
            setP(sec.items[i], field, val);
        }, { force: false });
    }
    function delItem(type, i) {
        commitEditorMutation(() => {
            const sec = cvData.sections.find(s => s.type === type);
            if (!sec || i < 0 || i >= sec.items.length) return false;
            sec.items.splice(i, 1);
        }, { force: true });
    }
    function addItem(type) {
        commitEditorMutation(() => {
            const sec = cvData.sections.find(s => s.type === type);
            if (!sec || typeof BLANK[type] !== 'function') return false;
            sec.items.push(BLANK[type]());
        }, { force: true, after: () => setTimeout(() => {
            const cards = document.querySelectorAll(`.icard[data-type="${type}"]`);
            if (cards.length) cards[cards.length-1].scrollIntoView({ behavior:"smooth", block:"center" });
        }, 100) });
    }
    function addSection(type) {
        commitEditorMutation(() => {
            if (cvData.sections.find(s => s.type === type)) return false;
            const maxOrder = Math.max(0, ...cvData.sections.map(s => s.order ?? 0));
            cvData.sections.push({ type, title: humanType(type), visible: true, order: maxOrder + 1, items: [] });
        }, { force: true });
    }
    function reorderItem(type, fromIdx, toIdx) {
        commitEditorMutation(() => {
            const sec = cvData.sections.find(s => s.type === type);
            if (!sec || fromIdx < 0 || toIdx < 0 || fromIdx >= sec.items.length || toIdx >= sec.items.length || fromIdx === toIdx) return false;
            const [moved] = sec.items.splice(fromIdx, 1); sec.items.splice(toIdx, 0, moved);
        }, { force: true });
    }
    function moveItem(type, i, dir) {
        const sec = cvData.sections.find(s => s.type === type); if (!sec) return;
        const target = i + dir; if (target < 0 || target >= sec.items.length) return;
        reorderItem(type, i, target);
    }
    function toggleSecVis(type) {
    commitEditorMutation(() => {
        const sec = cvData.sections.find(s => s.type === type);
        if (!sec) return false;

        sec.visible = sec.visible === false;
    }, { force: true });
}
    function moveSec(type, dir) {
        commitEditorMutation(() => {
            const secs = cvData.sections; const sec = secs.find(s => s.type === type); if (!sec) return false;
            const sorted = [...secs].sort((a,b) => (a.order ?? 0) - (b.order ?? 0));
            const idx = sorted.indexOf(sec); const target = sorted[idx + dir]; if (!target) return false;
            const tmp = sec.order; sec.order = target.order; target.order = tmp;
        }, { force: true });
    }
    function renameSection(type) {
        const sec = cvData.sections.find(s => s.type === type); if (!sec) return;
        const name = prompt("Section title:", sec.title);
        if (!name || !name.trim() || name.trim() === sec.title) return;
        commitEditorMutation(() => { sec.title = name.trim(); }, { force: true });
    }
    function addBullet(type, i) {
        commitEditorMutation(() => {
            const sec = cvData.sections.find(s => s.type === type); if (!sec || !sec.items[i]) return false;
            if (!Array.isArray(sec.items[i].bullets)) sec.items[i].bullets = [];
            sec.items[i].bullets.push("");
        }, { force: true, after: () => setTimeout(() => {
            const list = document.getElementById(`bullets-${type}-${i}`);
            if (list) { const inputs = list.querySelectorAll('.bullet-input'); if (inputs.length) inputs[inputs.length-1].focus(); }
        }, 80) });
    }
    function updateBullet(type, i, j, val) {
        commitEditorMutation(() => {
            const sec = cvData.sections.find(s => s.type === type);
            if (!sec || !sec.items[i] || !Array.isArray(sec.items[i].bullets) || j < 0 || j >= sec.items[i].bullets.length) return false;
            sec.items[i].bullets[j] = val;
        }, { force: false });
    }
    function removeBullet(type, i, j) {
        commitEditorMutation(() => {
            const sec = cvData.sections.find(s => s.type === type);
            if (!sec || !sec.items[i] || !Array.isArray(sec.items[i].bullets) || j < 0 || j >= sec.items[i].bullets.length) return false;
            sec.items[i].bullets.splice(j, 1);
        }, { force: true });
    }
    function reorderBullet(type, i, fromJ, toJ) {
        commitEditorMutation(() => {
            const sec = cvData.sections.find(s => s.type === type); const bullets = sec?.items[i]?.bullets;
            if (!Array.isArray(bullets) || fromJ < 0 || toJ < 0 || fromJ >= bullets.length || toJ >= bullets.length || fromJ === toJ) return false;
            const [moved] = bullets.splice(fromJ, 1); bullets.splice(toJ, 0, moved);
        }, { force: true });
    }
    function moveBullet(type, i, j, dir) {
        const sec = cvData.sections.find(s => s.type === type); const bullets = sec?.items[i]?.bullets; if (!Array.isArray(bullets)) return;
        const target = j + dir; if (target < 0 || target >= bullets.length) return;
        reorderBullet(type, i, j, target);
    }
    function updateDateField(prefix, field, part, val) {
        commitEditorMutation(() => {
            const parts = prefix.split("-"); const i = parseInt(parts[parts.length - 1], 10); const typeStr = parts.slice(0, -1).join("-");
            const sec = cvData.sections.find(s => s.type === typeStr); if (!sec || !sec.items[i]) return false;
            const current = sec.items[i][field] || ""; const [y,m] = current.split("-");
            const newY = part === "year" ? val : (y || ""); const newM = part === "month" ? val : (m || "");
            sec.items[i][field] = newY ? (newM ? `${newY}-${newM}` : newY) : "";
        }, { force: false });
    }
    function selectTemplate(id) {
        commitEditorMutation(() => {
            if (!TEMPLATE_REGISTRY.has(id) || id === currentTemplateId) return false;
            currentTemplateId = id; cvData.meta.templateId = id; cvData.meta.themeOverrides = cvData.meta.themeOverrides || {};
        }, { force: true, step: 5, updateLabel: true });
    }
    function setAccentColor(v) {
        commitEditorMutation(() => {
            cvData.meta.themeOverrides = cvData.meta.themeOverrides || {};
            if (cvData.meta.themeOverrides.primaryColor === v) return false;
            cvData.meta.themeOverrides.primaryColor = v;
        }, { force: true, step: 5 });
    }
    function setPaperColor(v) {
        commitEditorMutation(() => {
            cvData.meta.themeOverrides = cvData.meta.themeOverrides || {};
            if (v) { if (cvData.meta.themeOverrides.paperColor === v) return false; cvData.meta.themeOverrides.paperColor = v; }
            else { if (!cvData.meta.themeOverrides.paperColor) return false; delete cvData.meta.themeOverrides.paperColor; }
        }, { force: true, step: 5 });
    }
    function setScale(v) {
        commitEditorMutation(() => {
            cvData.meta.themeOverrides = cvData.meta.themeOverrides || {};
            if (cvData.meta.themeOverrides.fontSizeScale === v) return false;
            cvData.meta.themeOverrides.fontSizeScale = v;
        }, { force: true, step: 5 });
    }
    function setSpacing(v) {
        commitEditorMutation(() => {
            cvData.meta.themeOverrides = cvData.meta.themeOverrides || {};
            if (cvData.meta.themeOverrides.spacingScale === v) return false;
            cvData.meta.themeOverrides.spacingScale = v;
        }, { force: true, step: 5 });
    }
    function resetDesign() {
        commitEditorMutation(() => {
            const before = JSON.stringify(cvData.meta.themeOverrides || {});
            cvData.meta.themeOverrides = {};
            return before !== JSON.stringify(cvData.meta.themeOverrides || {});
        }, { force: true, step: 5, updateLabel: true });
    }
    function updatePaLabel() { const el = document.getElementById('pa-tmpl-lbl'); if (!el) return; const t = TEMPLATE_CONFIGS.find(t => t.id === currentTemplateId); el.textContent = t ? `${t.name} · ${t.desc}` : currentTemplateId; }
    let editorPanelOpen = true;
    function toggleEditorPanel() {
    editorPanelOpen = !editorPanelOpen;
    const ep = document.getElementById('editor-panel');
    const lbl = document.getElementById('bh-fab-editor-txt');
    ep.style.display = editorPanelOpen ? '' : 'none';
    if (lbl) lbl.textContent = editorPanelOpen ? '◀ Hide Editor' : '▶ Show Editor';
    requestAnimationFrame(scalePreviewToFit);
}
    function toggleBhFabMenu() {
    const w = document.getElementById('bh-fab-wrap');
    if (!w) return;
    const open = w.classList.toggle('open');
    const btn = document.getElementById('bh-fab-btn');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
    function closeBhFabMenu() {
    const w = document.getElementById('bh-fab-wrap');
    if (w) w.classList.remove('open');
    const btn = document.getElementById('bh-fab-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}
    document.addEventListener('click', (e) => {
    const w = document.getElementById('bh-fab-wrap');
    if (w && w.classList.contains('open') && !w.contains(e.target)) closeBhFabMenu();
});
    function bhFabAction(type) {
    closeBhFabMenu();
    if (type === 'preview') { window.innerWidth < 768 ? toggleMobilePreview() : togglePreviewFull(); }
    else if (type === 'editor') toggleEditorPanel();
    else if (type === 'ats') toggleAtsPanel();
    else if (type === 'cover') createNewCoverLetter(currentCvId);
    else if (type === 'download') exportPDF();
}
    function togglePreviewFull(){ document.getElementById('preview-area').classList.toggle('preview-full'); requestAnimationFrame(scalePreviewToFit); }

    function toggleAtsPanel() { atsPanelOpen = !atsPanelOpen; const p = document.getElementById('ats-panel'); p.classList.toggle('open', atsPanelOpen); if (atsPanelOpen) renderAtsPanel(); }
    function runATSCheck()    { atsPanelOpen = true; document.getElementById('ats-panel').classList.add('open'); renderAtsPanel(); }

    function renderAtsPanel() {
        const panel = document.getElementById('ats-panel'); if (!panel) return;
        const checks = atsChecks();
        const score = checks.filter(c => c.pass).length;
        panel.innerHTML = `
        <h2>ATS Readiness</h2>
        <p class="ats-sc"><strong>${score}/${checks.length}</strong> checks passed</p>
        ${checks.map(c => `
        <div class="ats-chk ${c.pass?"pass":"fail"}">
            <div class="ck-i">${c.pass?"✓":"✗"}</div>
            <div><p class="ck-lb">${c.label}</p><p class="ck-wy">${c.why}</p></div>
        </div>`).join("")}
        ${targetJD
            ? `<div style="margin-top:12px"><p style="font-size:11px;font-weight:700;color:var(--t2);margin:0 0 6px">Missing Keywords</p>${renderKeywordGap()}</div>`
            : `<div class="ats-jd" style="margin-top:12px">
                <label>Paste a job description for keyword analysis:</label>
                <textarea rows="3" placeholder="Paste job description…" oninput="targetJD=this.value"></textarea>
                <button class="btn btn-primary btn-sm" style="width:100%;margin-top:6px" onclick="renderAtsPanel()">Analyse</button>
               </div>`}`;
    }

    function atsChecks() {
        const p = cvData.personalDetails;
        const expSec = cvData.sections.find(s => s.type === "experience");
        const text   = buildResumeText();
        return [
            { pass: !!p.email,   label: "Contact email",   why: "ATS parsers require an email address." },
            { pass: !!p.phone,   label: "Phone number",    why: "Recruiters need a direct contact number." },
            { pass: (p.summary||"").trim().split(/\s+/).filter(Boolean).length >= 30, label: "Summary (30+ words)", why: "A summary helps ATS classify your profile." },
            { pass: !!expSec && expSec.items.length > 0,   label: "Work experience",  why: "At least one role is expected by most ATS." },
            { pass: expSec ? expSec.items.some(it => it.bullets && it.bullets.length >= 2) : false, label: "2+ bullets per job", why: "Bullets are scanned for keywords." },
            { pass: expSec ? expSec.items.every(it => it.startDate) : false, label: "Dates on all roles", why: "ATS checks employment chronology." },
            { pass: /[0-9]+/.test(text), label: "Quantified achievements", why: "Numbers improve ATS ranking. E.g. 'reduced costs by 20%'." },
            { pass: !(/résumé|€|£|👍|🎯|★/.test(text)), label: "ATS-safe characters", why: "Emoji and special chars can break parsers." },
            { pass: !!cvData.sections.find(s => s.type==="skills" && s.visible && s.items.length > 2), label: "Skills section (3+)", why: "Skills are the #1 ATS keyword match source." }
        ];
    }

    function buildResumeText() {
        const p = cvData.personalDetails;
        let t = `${p.fullName} ${p.jobTitle} ${p.summary} ${p.email} ${p.phone}`;
        cvData.sections.forEach(s => s.items.forEach(it => {
            t += ` ${it.role||""} ${it.company||""} ${it.qualification||""} ${it.institution||""} ${it.name||""} ${it.title||""} ${it.value||""} ${(it.bullets||[]).join(" ")} ${it.notes||""}`;
        }));
        return t;
    }

    function renderKeywordGap() {
        if (!targetJD.trim()) return "";
        const stop = new Set("a an the and or but in on at to for of with is are was were be been have has had do does did will would could should may might this that these those i we you he she it they their our your my his her its".split(" "));
        const jdWords = targetJD.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
        const cvText  = buildResumeText().toLowerCase();
        const missing = [...new Set(jdWords)].filter(w => !stop.has(w) && !cvText.includes(w)).slice(0, 15);
        if (!missing.length) return `<p style="font-size:11px;color:#16A34A">✅ Great keyword match! No obvious gaps found.</p>`;
        return `<p style="font-size:11px;color:var(--t2);margin:0 0 6px">Words in the job description not found in your CV:</p><div style="display:flex;flex-wrap:wrap;gap:4px">${missing.map(w => `<span style="background:#FEF3C7;color:#92400E;font-size:11px;padding:2px 8px;border-radius:10px;border:1px solid #FDE68A">${w}</span>`).join("")}</div>`;
    }

    // ---------- BOTTOM STATUS BAR (surfaces the same ATS checks as the side panel, always visible) ----------
    function updateStatusBar() {
        if (!cvData) return;
        const bar = document.getElementById('editor-statusbar');
        if (!bar) return;

        const checks = atsChecks();
        const score  = checks.filter(c => c.pass).length;
        const total  = checks.length;
        const atsTxt = document.getElementById('sb-ats-txt');
        const atsDot = document.getElementById('sb-ats-dot');
        if (atsTxt) atsTxt.textContent = `ATS ${score}/${total}`;
        if (atsDot) atsDot.className = 'sb-dot ' + (score === total ? 'good' : score >= Math.ceil(total * 0.6) ? 'warn' : 'bad');

        const words = buildResumeText().trim().split(/\s+/).filter(Boolean).length;
        const lenTxt = document.getElementById('sb-length-txt');
        if (lenTxt) lenTxt.textContent = `${words} words`;

        const p = cvData.personalDetails;
        const hasCore = !!(p.fullName && p.email && cvData.sections.some(s => s.visible && s.items.length));
        const readyTxt = document.getElementById('sb-ready-txt');
        const readyDot = document.getElementById('sb-ready-dot');
        if (readyTxt) readyTxt.textContent = hasCore ? 'Ready to export' : 'Add name, email & a section';
        if (readyDot) readyDot.className = 'sb-dot ' + (hasCore ? 'good' : 'warn');
    }

    
const AI_BACKEND_CONFIGURED = true;
const AI_BACKEND_URL = "/api/ai-generate";

async function callmellow(prompt, outputEl, onSuccess, onError) {
    outputEl.innerHTML = `<div style="display:inline-flex;align-items:center;gap:8px;background:#1B2A4A;color:#fff;padding:8px 12px;border-radius:6px"><span class="spinner" style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin .8s linear infinite"></span> Thinking...</div>`;

    if (!AI_BACKEND_CONFIGURED) {
        outputEl.innerHTML = `<p style="color:#B45309;font-size:12px;background:#FEF3C7;border:1px solid #FDE68A;border-radius:6px;padding:8px 10px">AI writing help isn't connected yet — this feature needs a backend set up first. Your CV editing, templates, and download all work normally without it.</p>`;
        if (onError) onError();
        return;
    }

    try {
        const resp = await fetch(AI_BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });
        if (!resp.ok) throw new Error(`Request failed (${resp.status})`);
        const data = await resp.json();
        const text = data.response;
        if (text) onSuccess(text);
        else { outputEl.innerHTML = `<p style="color:#DC2626;font-size:12px">No response received. Please try again.</p>`; if (onError) onError(); }
    } catch (err) {
        outputEl.innerHTML = `<p style="color:#DC2626;font-size:12px">Error: ${err.message}</p>`;
        if (onError) onError();
    }
}

function clSourceBackgroundSummary() {
    const srcId = clData && clData.meta.createdFrom;
    const src = srcId && allResumes[srcId];
    if (!src) return '';
    const p = src.personalDetails;
    const exp = src.sections.find(s => s.type === 'experience');
    const skillsSec = src.sections.find(s => s.type === 'skills');
    const lines = [];
    if (p.jobTitle) lines.push(`Target/current title: ${p.jobTitle}`);
    if (p.summary) lines.push(`Summary: ${p.summary}`);
    if (exp && exp.items[0]) lines.push(`Most recent role: ${exp.items[0].role} at ${exp.items[0].company}`);
    if (skillsSec && skillsSec.items.length) lines.push(`Key skills: ${skillsSec.items.map(s => s.name).slice(0, 8).join(', ')}`);
    return lines.join('\n').slice(0, 800);
}

function aiDraftCoverLetter(btnEl) {
    if (!clData) return;
    const panel = document.getElementById('cl-ai-status');
    if (!panel) return;
    panel.classList.add('open');
    if (btnEl) btnEl.disabled = true;

    const bg = clSourceBackgroundSummary();
    const prompt = `Write a professional, concise cover letter BODY only (2-4 short paragraphs). Do NOT include a greeting line like "Dear..." and do NOT include a sign-off like "Sincerely," — just the paragraphs of the letter itself.
Role applying for: "${clData.letter.jobTitle || 'this position'}"
Company: "${clData.recipient.company || 'the company'}"
${bg ? `Candidate background (use only these facts, do not invent anything beyond them):\n${bg}\n` : 'No candidate background was provided — keep it general and avoid inventing specific achievements or employers.\n'}
Keep it genuine and specific, avoid generic clichés like "team player" or "hard worker" unless backed by the background given. Return plain text only — no markdown, no quotation marks around the whole thing.`;

    callmellow(prompt, panel, (text) => {
        clData.letter.body = text.trim();
        const ta = document.getElementById('cl-body-input');
        if (ta) { ta.value = clData.letter.body; updateCLBodyWordCount(ta); }
        renderCoverLetterPreview();
        autoSaveCoverLetter();
        panel.innerHTML = ''; panel.classList.remove('open');
        if (btnEl) btnEl.disabled = false;
        showToast('Draft generated — review and personalize it', 'success');
    }, () => { if (btnEl) btnEl.disabled = false; });
}

    function aiImproveSummaryInline(btnEl) {
    const panel = document.getElementById('ai-summary-panel');
    const p = cvData.personalDetails;
    panel.classList.add('open');
    panel.innerHTML = `<div class="ai-loading"><span class="spinner"></span> Generating summary options…</div>`;
    btnEl.disabled = true;

    const prompt = `Give 3 alternative rewrites of this CV summary for a ${p.jobTitle||"professional"}. Punchy, specific, 50-70 words each. Return ONLY valid JSON: {"options": ["version 1", "version 2", "version 3"]}\n\nCurrent: "${p.summary}"`;

    callmellowJSON(prompt, panel, (data) => {
        panel.innerHTML = `
        <div class="ai-panel-hd">
            <span>✨ Suggested summaries — click one to apply</span>
            <button class="ai-panel-close" onclick="closeAiPanel(this)">✕</button>
        </div>
        <div class="ai-options ai-options-stacked">
            ${data.options.map(opt => `
                <button class="ai-option-card" onclick="applySummary(this)" data-text="${escHtml(opt)}">
                    ${escHtml(opt)}
                </button>
            `).join("")}
        </div>`;
        btnEl.disabled = false;
    }, () => { btnEl.disabled = false; });
}

function applySummary(btnEl) {
    commitEditorMutation(() => {
        const next = btnEl.dataset.text || "";
        if (cvData.personalDetails.summary === next) return false;
        cvData.personalDetails.summary = next;
    }, { force: true, step: 0 });
    const ta = document.querySelector('#ep-body textarea[oninput*="summary"]');
    if (ta) { ta.value = btnEl.dataset.text; updateWordCount(ta); }
    btnEl.closest('.ai-options').querySelectorAll('.ai-option-card').forEach(b => b.classList.remove('applied'));
    btnEl.classList.add('applied');
    showToast("Summary applied!", "success");
}

    function aiImproveInline(type, i, btnEl) {
    const sec = cvData.sections.find(s => s.type === type); if (!sec || !sec.items[i]) return;
    const it = sec.items[i];
    const label = it.role || it.name || it.title || "this item";
    const bullets = (it.bullets || []).filter(b => b.trim());
    if (!bullets.length) { showToast("Add some bullet points first!", "info"); return; }

    const panel = document.getElementById(`ai-panel-${type}-${i}`);
    if (!panel) return;

    panel.classList.add('open');
    panel.innerHTML = `<div class="ai-loading"><span class="spinner"></span> Generating improved bullets…</div>`;
    if (btnEl) btnEl.disabled = true;

    const prompt = `Improve these CV bullets for "${label}". For EACH original bullet, give 3 alternative rewrites using strong action verbs and quantifying impact where possible. Return ONLY valid JSON, no markdown, no commentary, in this exact shape:
[
  { "original": "original bullet text", "options": ["rewrite 1", "rewrite 2", "rewrite 3"] }
]

Original bullets:
${bullets.map(b => `- ${b}`).join("\n")}`;

    callmellowJSON(prompt, panel, (data) => {
        renderBulletOptionsPanel(panel, type, i, data);
        if (btnEl) btnEl.disabled = false;
    }, () => { if (btnEl) btnEl.disabled = false; });
}

function renderBulletOptionsPanel(panel, type, i, data) {
    const sec = cvData.sections.find(s => s.type === type);
    const currentBullets = sec.items[i].bullets || [];

    panel.innerHTML = `
    <div class="ai-panel-hd">
        <span>✨ Suggested rewrites — click one to apply</span>
        <button class="ai-panel-close" onclick="closeAiPanel(this)">✕</button>
    </div>
    ${data.map((group) => {
        const bulletIdx = currentBullets.findIndex(b => b.trim() === group.original.trim());
        const safeIdx = bulletIdx === -1 ? 0 : bulletIdx;
        return `
        <div class="ai-bullet-group">
            <p class="ai-orig">Original: "${escHtml(group.original)}"</p>
            <div class="ai-options">
                ${group.options.map(opt => `
                    <button class="ai-option-card" onclick="applySingleBullet('${type}',${i},${safeIdx},this)" data-text="${escHtml(opt)}">
                        ${escHtml(opt)}
                    </button>
                `).join("")}
                <button class="ai-option-keep" onclick="dismissBulletGroup(this)">Keep original</button>
            </div>
        </div>`;
    }).join("")}`;
}

function applySingleBullet(type, i, j, btnEl) {
    commitEditorMutation(() => {
        const sec = cvData.sections.find(s => s.type === type);
        if (!sec || !sec.items[i] || !Array.isArray(sec.items[i].bullets) || j < 0 || j >= sec.items[i].bullets.length) return false;
        const next = btnEl.dataset.text || "";
        if (sec.items[i].bullets[j] === next) return false;
        sec.items[i].bullets[j] = next;
    }, { force: true });
    const list = document.getElementById(`bullets-${type}-${i}`);
    if (list) { const rows = list.querySelectorAll('.bullet-row'); const row = rows[j]; if (row) row.querySelector('.bullet-input').value = btnEl.dataset.text; }
    btnEl.closest('.ai-options').querySelectorAll('.ai-option-card').forEach(b => b.classList.remove('applied'));
    btnEl.classList.add('applied');
    showToast("Bullet updated!", "success");
}

    function applyBullets(btn, type, i) {
        const bullets = JSON.parse(btn.dataset.bullets);
        commitEditorMutation(() => {
            const sec = cvData.sections.find(s => s.type === type);
            if (!sec || !sec.items[i]) return false;
            if (JSON.stringify(sec.items[i].bullets || []) === JSON.stringify(bullets)) return false;
            sec.items[i].bullets = bullets;
        }, { force: true });
        showToast("Bullets applied!", "success");
    }

    function aiSuggestBullets() {
        const out = document.getElementById('ai-output'); if (!out) return;
        const expSec = cvData.sections.find(s => s.type === "experience");
        if (!expSec || !expSec.items.length) { out.innerHTML = `<p style="color:#B45309">Add at least one job under Experience first.</p>`; return; }
        const it = expSec.items[0];
        callmellow(
            `Suggest 4 strong CV bullet points for someone who worked as "${it.role}" at "${it.company}". Action verbs, quantified where possible. Return ONLY the bullets, one per line starting with -.`,
            out,
            text => {
                const bullets = text.trim().split(/\n/).map(l => l.replace(/^[-•*]\s*/,"").trim()).filter(Boolean);
                out.innerHTML = `<p style="margin:0 0 6px;font-weight:600">Suggested bullets for "${escHtml(it.role)}":</p><div style="background:#F0FDF4;border:1px solid #86EFAC;border-radius:6px;padding:10px;margin-bottom:8px">${bullets.map(b=>`<p style="margin:2px 0;padding-left:12px">• ${escHtml(b)}</p>`).join("")}</div><button class="btn btn-primary btn-sm" onclick="applyBullets(this,'experience',0)" data-bullets='${JSON.stringify(bullets).replace(/'/g,"&#39;")}'>Apply these bullets</button>`;
            }
        );
    }

    function aiCheckATS() {
        const out = document.getElementById('ai-output'); if (!out) return;
        callmellow(
            `Analyse this CV text for ATS compatibility. Give 5 specific, actionable tips as a numbered list. Be concise.\n\nCV:\n${buildResumeText().slice(0, 2000)}`,
            out,
            text => { out.innerHTML = `<p style="margin:0 0 6px;font-weight:600">ATS Improvement Tips:</p><div style="background:#EFF6FF;border:1px solid #93C5FD;border-radius:6px;padding:10px;line-height:1.7">${escHtml(text.trim()).replace(/\n/g,"<br>")}</div>`; }
        );
    }

    function aiRoleSuggestions(role) {
        const out = document.getElementById('ai-output'); if (!out) return;
        callmellow(
            `List 5 important skills and 3 strong CV bullet examples for a ${role} role.\nFormat:\nSKILLS: skill1, skill2, skill3, skill4, skill5\nBULLETS:\n- bullet 1\n- bullet 2\n- bullet 3`,
            out,
            text => { out.innerHTML = `<p style="margin:0 0 6px;font-weight:600">Suggestions for ${escHtml(role)}:</p><div style="background:#F5F3FF;border:1px solid #C4B5FD;border-radius:6px;padding:10px;line-height:1.7">${escHtml(text.trim()).replace(/\n/g,"<br>")}</div>`; }
        );
    }

    async function callmellowJSON(prompt, panelEl, onSuccess, onError) {
    if (!AI_BACKEND_CONFIGURED) {
        panelEl.innerHTML = `<p class="ai-error">AI writing help isn't connected yet — this feature needs a backend set up first.</p>`;
        if (onError) onError();
        return;
    }
    try {
        const resp = await fetch(AI_BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, json: true })
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
            const detail = data.upstreamMessage || data.error || `status ${resp.status}`;
            throw new Error(detail);
        }
        let text = (data.response || "").trim();
        text = text.replace(/^```json\s*/i, "").replace(/^```\s*/,"").replace(/```\s*$/,"");
        const parsed = JSON.parse(text);
        onSuccess(parsed);
    } catch (err) {
        panelEl.innerHTML = `<p class="ai-error">Error: ${escHtml(err.message)}. <button class="btn-ai" onclick="closeAiPanel(this)">Dismiss</button></p>`;
        if (onError) onError();
    }
    }

// ---------- IMPORT CV FROM DEVICE (.docx / .txt / .md only — no PDF, see roadmap) ----------
let _mammothLoadPromise = null;
function loadMammoth() {
    if (window.mammoth) return Promise.resolve();
    if (_mammothLoadPromise) return _mammothLoadPromise;
    _mammothLoadPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.11.0/mammoth.browser.min.js';
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Could not load the .docx reader — check your connection and try again.'));
        document.head.appendChild(s);
    });
    return _mammothLoadPromise;
}
async function extractDocxText(file) {
    await loadMammoth();
    const buffer = await file.arrayBuffer();
    const result = await window.mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value || '';
}

function importSpinner(label) {
    return `<div class="ai-loading"><span style="display:inline-block;width:14px;height:14px;border:2px solid rgba(55,48,163,0.25);border-top-color:#3730A3;border-radius:50%;animation:spin .8s linear infinite"></span> ${escHtml(label)}</div>`;
}

async function handleImportFile(input) {
    const file = input.files[0]; if (!file) return;
    const status = document.getElementById('import-status');
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (!['docx','txt','md'].includes(ext)) {
        status.innerHTML = `<p class="ai-error">Unsupported file type. Please choose a .docx, .txt or .md file.</p>`;
        return;
    }
    status.innerHTML = importSpinner(`Reading ${file.name}…`);

    let rawText = '';
    try {
        rawText = ext === 'docx' ? await extractDocxText(file) : await file.text();
    } catch (err) {
        status.innerHTML = `<p class="ai-error">Couldn't read that file: ${escHtml(err.message)}</p>`;
        return;
    }

    rawText = (rawText || '').trim();
    if (rawText.length < 30) {
        status.innerHTML = `<p class="ai-error">That file doesn't seem to contain readable CV text. Try a different file.</p>`;
        return;
    }
    const truncated = rawText.length > 6000;
    const text = rawText.slice(0, 6000);

    status.innerHTML = importSpinner('Extracting your details…');
    callmellowJSON(buildImportPrompt(text), status, (parsed) => finalizeImportedResume(parsed, truncated), null);
}

const IMPORT_SECTION_ORDER  = ["experience","education","projects","skills","languages","certificates","references","interests","custom"];
const IMPORT_SECTION_TITLES = { experience:"Experience", education:"Education", projects:"Projects", skills:"Skills", languages:"Languages", certificates:"Certificates", references:"References", interests:"Interests", custom:"Additional Information" };

function buildImportPrompt(text) {
    return `You are extracting structured CV data from raw resume text. Return ONLY valid JSON (no markdown fences, no commentary) matching exactly this shape:
{
  "personalDetails": { "fullName": "", "jobTitle": "", "email": "", "phone": "", "location": "", "summary": "" },
  "sections": {
    "experience":   [ { "role": "", "company": "", "location": "", "startDate": "YYYY-MM or YYYY or empty", "endDate": "YYYY-MM or YYYY or empty", "current": false, "bullets": [] } ],
    "education":    [ { "qualification": "", "institution": "", "location": "", "startDate": "", "endDate": "", "current": false, "notes": "" } ],
    "projects":     [ { "name": "", "url": "", "startDate": "", "endDate": "", "bullets": [] } ],
    "skills":       [ { "name": "", "level": "" } ],
    "languages":    [ { "name": "", "level": "" } ],
    "certificates": [ { "name": "" } ],
    "references":   [ { "name": "", "title": "", "phone": "", "email": "" } ],
    "interests":    [ { "value": "" } ],
    "custom":       [ { "title": "", "bullets": [] } ]
  }
}
Rules:
- Only include information that actually appears in the text below. Use "" for a field that isn't present.
- Never invent employers, dates, numbers, or achievements that aren't in the source text — do not embellish bullets beyond what's stated.
- Set "current" to true only if the text explicitly marks a role/qualification as ongoing (e.g. "present", "current"); leave "endDate" empty in that case.
- Bullets should closely reflect the original wording, cleaned up for grammar only.
- Omit a section entirely (empty array) if there's nothing relevant in the text — don't invent placeholder items.

Resume text:
"""
${text}
"""`;
}

function importStr(v) { return (typeof v === 'string') ? v : (v == null ? '' : String(v)); }

function coerceImportedItem(type, raw) {
    const blank = BLANK[type] ? BLANK[type]() : { id: genId('x') };
    const clean = { id: blank.id };
    Object.keys(blank).forEach(k => {
        if (k === 'id') return;
        let v = (raw && raw[k] !== undefined) ? raw[k] : blank[k];
        if (k === 'bullets')      v = Array.isArray(v) ? v.filter(b => typeof b === 'string' && b.trim()).slice(0, 8) : [];
        else if (k === 'current') v = !!v;
        else if (typeof blank[k] === 'string') v = importStr(v);
        clean[k] = v;
    });
    return clean;
}

function finalizeImportedResume(parsed, truncated) {
    if (typeof editorHistoryClear === 'function') editorHistoryClear();
    const pd = (parsed && parsed.personalDetails) || {};
    const newCvData = {
        meta: { cvId: 'cv_' + Date.now().toString(36), templateId: 'modern-01', themeOverrides: {} },
        personalDetails: {
            fullName: importStr(pd.fullName), jobTitle: importStr(pd.jobTitle), email: importStr(pd.email),
            phone: importStr(pd.phone), location: importStr(pd.location), photo: null, links: [],
            summary: importStr(pd.summary)
        },
        sections: []
    };

    let order = 1;
    const rawSections = (parsed && parsed.sections) || {};
    IMPORT_SECTION_ORDER.forEach(type => {
        const items = Array.isArray(rawSections[type]) ? rawSections[type].filter(Boolean) : [];
        if (!items.length) return;
        newCvData.sections.push({
            type, title: IMPORT_SECTION_TITLES[type], visible: true, order: order++,
            items: items.map(it => coerceImportedItem(type, it))
        });
    });

    if (!newCvData.personalDetails.fullName && !newCvData.sections.length) {
        const status = document.getElementById('import-status');
        if (status) status.innerHTML = `<p class="ai-error">Couldn't confidently pull any details from that file. Try a cleaner export of your CV, or build from scratch instead.</p>`;
        return;
    }

    allResumes[newCvData.meta.cvId] = newCvData;
    saveAllResumes();
    closeImportModal();
    setCurrentResume(newCvData.meta.cvId);
    showToast(truncated ? 'CV imported (long file — please review carefully)' : 'CV imported — review before downloading', 'success');
}


/* React rendering bridge: keep the existing Factory editor/controller intact while
   moving the canonical preview into the React A4 engine. */
window.__RF_GET_STATE__ = function () { return { data: cvData, templateId: currentTemplateId }; };
window.__RF_RENDER_TEMPLATE__ = function (data, templateId) { return renderTemplateContent(data, templateId); };
window.__RF_RENDER_SECTION__ = function (section) { return (typeof SR !== 'undefined' && SR[section.type]) ? SR[section.type](section) : ''; };
window.__RF_CONTACT_HTML__ = function (personal) { return (typeof contactListHtml === 'function') ? contactListHtml(personal) : ''; };

/* ==========================================================================
   PDF EXPORT ENGINE — PHASES 1–5
   --------------------------------------------------------------------------
   The browser preview is the canonical resume document.

   Local export prints the live preview DOM directly. The production server
   path receives the same rendered markup for Chromium PDF generation. There
   is no second renderer, page composer, pixel slicer, or manual paginator.
   ========================================================================== */

const PDF_EXPORT_ENDPOINT = '/api/export-pdf';
let activePdfExportRoot = null;
let activePdfExportMode = null;

/*
 * Canonical print/export preparation.
 *
 * IMPORTANT: there is intentionally no pagination/composition engine here.
 * The live preview (#cv-root / #cl-preview-root) is the canonical resume
 * document. Local PDF export prints that exact DOM. The server export, when
 * required by the production download gate, receives that same rendered
 * markup rather than a separately paginated reconstruction.
 */
async function waitForPdfFontsAndImages(root) {
    if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
    }

    const images = Array.from(root.querySelectorAll('img'));
    await Promise.all(images.map(async img => {
        if (img.complete) {
            if (img.naturalWidth > 0 && typeof img.decode === 'function') {
                try { await img.decode(); } catch (_) {}
            }
            return;
        }
        await new Promise(resolve => {
            const done = () => {
                img.removeEventListener('load', done);
                img.removeEventListener('error', done);
                resolve();
            };
            img.addEventListener('load', done, { once: true });
            img.addEventListener('error', done, { once: true });
        });
    }));
}

function validatePdfExportState(documentType) {
    if (documentType === 'cv') {
        if (!cvData || !cvData.personalDetails) throw new Error('No CV data is available.');
        if (!String(cvData.personalDetails.fullName || '').trim()) {
            throw new Error('Add the candidate name before exporting the CV.');
        }
    } else {
        if (!clData || !clData.sender || !clData.letter) throw new Error('No cover letter data is available.');
        if (!String(clData.sender.fullName || '').trim()) {
            throw new Error('Add the sender name before exporting the cover letter.');
        }
    }
}

function getCanonicalPdfRoot(documentType) {
    const selector = documentType === 'coverletter' ? '#cl-preview-root' : '#cv-root';
    const root = document.querySelector(selector);
    if (!root) throw new Error(`Canonical ${documentType} preview is unavailable.`);
    return root;
}

async function preparePdfExport(documentType) {
    validatePdfExportState(documentType);
    activePdfExportMode = documentType;

    const root = getCanonicalPdfRoot(documentType);
    await waitForPdfFontsAndImages(root);

    /* Two animation frames give the browser a deterministic layout/paint
       boundary after fonts/images and any last editor update have settled. */
    await new Promise(resolve => requestAnimationFrame(() =>
        requestAnimationFrame(resolve)
    ));

    return root;
}



function serializeCanonicalPdfDocument(root, documentType, styles) {
    const clone = root.cloneNode(true);
    clone.style.transform = '';
    clone.style.marginBottom = '';

    
    clone.querySelectorAll(
        '[data-rf-continuation="true"] header, ' +
        '[data-rf-continuation="true"] [data-rf-region="header"], ' +
        '[data-rf-hidden-continuation="true"]'
    ).forEach(el => el.remove());

    const canonicalMarkup = clone.outerHTML;

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=210mm, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600&family=Manrope:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600&family=Syne:wght@400;600;700&family=Fraunces:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600&family=Playfair+Display:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&family=DM+Serif+Display:wght@400&family=Bodoni+Moda:wght@400;500;600&family=Archivo+Narrow:wght@400;500;600&display=swap" rel="stylesheet">
<style>${styles.baseCss || ''}</style>
</head>
<body class="pdf-server-document" data-rf-print-document="${documentType}">
${canonicalMarkup}
<style>${styles.exportCss || ''}</style>
</body>
</html>`;
}

function removePdfExportRoot() {
    activePdfExportRoot = null;
    activePdfExportMode = null;
    document.body.classList.remove('pdf-export-active');
    document.body.removeAttribute('data-rf-print-document');
}

function exportFileName(documentType) {
    const source = documentType === 'coverletter'
        ? (clData && clData.sender && clData.sender.fullName)
        : (cvData && cvData.personalDetails && cvData.personalDetails.fullName);

    const safe = String(source || (documentType === 'coverletter' ? 'Cover_Letter' : 'Resume'))
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '_')
        .slice(0, 80);

    return `${safe || (documentType === 'coverletter' ? 'Cover_Letter' : 'Resume')}.pdf`;
}

async function getPdfGlobalStyles() {
    /*
     * The template renderer already embeds each shell template's scoped CSS
     * inside its returned markup. Legacy templates use the global styles.css.
     *
     * The live preview also depends on src/styles/react-engine.css — the
     * React A4 engine's own stylesheet (page geometry, sidebar/main region
     * stretching, pagination breaks, backgrounds). That file only ever
     * reaches the browser through main.jsx's `import './styles/react-engine.css'`,
     * a Vite-processed import with no stable URL, so the export document used
     * to be built from styles.css + pdf-export.css alone and silently missed
     * every rule that lived only in the engine stylesheet. That gap — not any
     * single template's CSS — was the real cause of preview/export mismatches
     * (wiped backgrounds, unstretched sidebars, wrong pagination) that kept
     * resurfacing one template at a time. public/css/react-engine.css is a
     * byte-for-byte static copy of that same file at a stable, fetchable URL
     * (kept in sync by tests/react-engine-export-parity.cjs), so the export
     * document now gets the identical engine rules the preview renders with.
     *
     * Keep pdf-export.css separate from the rest: template shell <style>
     * blocks are inside pageHtml, so pdf-export.css must be appended AFTER
     * pageHtml to remain the final pagination authority.
     */
    const [baseCss, engineCss, exportCss] = await Promise.all(
        ['/css/styles.css', '/css/react-engine.css', '/css/pdf-export.css'].map(async url => {
            try {
                const res = await fetch(url, { credentials: 'same-origin' });
                if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
                return await res.text();
            } catch (err) {
                console.warn('PDF stylesheet unavailable:', url, err);
                return '';
            }
        })
    );

    return { baseCss: `${baseCss}\n${engineCss}`, exportCss };
}

function buildServerPdfDocument(root, documentType, styles) {
    return serializeCanonicalPdfDocument(root, documentType, styles);
}

async function exportPdfViaBackend(documentType, templateId, authorization = {}) {
    const root = await preparePdfExport(documentType);

    try {
        const globalStyles = await getPdfGlobalStyles();
        const html = buildServerPdfDocument(root, documentType, globalStyles);

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        };

        if (authorization.accessToken) {
            headers.Authorization = `Bearer ${authorization.accessToken}`;
        }

        const response = await fetch(PDF_EXPORT_ENDPOINT, {
            method: 'POST',
            headers,
            credentials: 'same-origin',
            body: JSON.stringify({
                documentType,
                templateId: templateId || getPdfExportTemplateId(documentType),
                fileName: exportFileName(documentType),
                device_id: authorization.deviceId || null,
                html
            })
        });

        if (!response.ok) {
            let message = `PDF server returned ${response.status}`;
            let code = null;
            try {
                const body = await response.json();
                if (body && body.error) message = body.error;
                if (body && body.reason) code = body.reason;
            } catch (_) {}

            const error = new Error(message);
            error.code = code;
            error.status = response.status;
            throw error;
        }

        const blob = await response.blob();
        if (!blob || !blob.size) throw new Error('The PDF server returned an empty file.');

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = exportFileName(documentType);
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        setTimeout(() => URL.revokeObjectURL(url), 30000);
        showToast('PDF downloaded!', 'success');
    } finally {
        removePdfExportRoot();
    }
}

async function exportPdfWithBrowserPrint(documentType) {
    const root = await preparePdfExport(documentType);

    activePdfExportRoot = root;
    document.body.classList.add('pdf-export-active');
    document.body.setAttribute('data-rf-print-document', documentType);

    let cleaned = false;
    const mediaQuery = window.matchMedia('print');

    const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        window.removeEventListener('afterprint', cleanup);
        if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', onMediaChange);
        else if (mediaQuery.removeListener) mediaQuery.removeListener(onMediaChange);
        removePdfExportRoot();
    };

    const onMediaChange = event => {
        if (!event.matches) cleanup();
    };

    window.addEventListener('afterprint', cleanup, { once: true });
    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', onMediaChange);
    else if (mediaQuery.addListener) mediaQuery.addListener(onMediaChange);

    await new Promise(resolve => requestAnimationFrame(() =>
        requestAnimationFrame(resolve)
    ));

    window.print();
}

async function exportPDFDirect() {
    if (!cvData) {
        showToast('No CV to export', 'error');
        return;
    }

    try {
        if (typeof window.__RF_EXPORT_CLIENT_PDF__ !== 'function') throw new Error('The React PDF engine is not ready yet.');
        const base = String(cvData.personalDetails?.fullName || 'Resume').trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '_') || 'Resume';
        await window.__RF_EXPORT_CLIENT_PDF__({ fileName: `${base}.pdf` });
        showToast('PDF downloaded!', 'success');
    } catch (err) {
        console.error('Local PDF export failed:', err);
        removePdfExportRoot();
        showToast('PDF failed: ' + (err.message || err), 'error');
    }
}

async function exportCoverLetterPDFDirect() {
    if (!clData) {
        showToast('No cover letter to export', 'error');
        return;
    }

    try {
        await exportPdfWithBrowserPrint('coverletter');
    } catch (err) {
        console.error('Local cover-letter PDF export failed:', err);
        removePdfExportRoot();
        showToast('PDF failed: ' + (err.message || err), 'error');
    }
}

/*
 * Public entry points used by the existing download gate.
 */
window.exportPDFDirect = exportPDFDirect;
window.exportCoverLetterPDFDirect = exportCoverLetterPDFDirect;
window.exportPdfViaBackend = exportPdfViaBackend;

function exportPDF() {
    attemptDownload('cv', currentTemplateId);
}

function exportCoverLetterPDF() {
    if (!clData) {
        showToast('No cover letter to export', 'error');
        return;
    }
    attemptDownload('coverletter', clData.meta.templateId);
}

function shareResume() { }
function loadSharedResume() { }

let galleryFilter = "all";
// Attribute filters are independent toggles layered on top of the category
// filter: { ats: bool, onePage: bool, twoPage: bool, photo: bool, noPhoto: bool }
let galleryAttrFilters = { ats: false, onePage: false, twoPage: false, photo: false, noPhoto: false };
function setGalleryFilter(cat, btn) {
    galleryFilter = cat;
    document.querySelectorAll('.f-btn[data-role="cat"]').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderGallery();
}
function toggleGalleryAttrFilter(key, btn) {
    // "onePage"/"twoPage" and "photo"/"noPhoto" are mutually exclusive pairs
    const exclusive = { onePage: 'twoPage', twoPage: 'onePage', photo: 'noPhoto', noPhoto: 'photo' };
    galleryAttrFilters[key] = !galleryAttrFilters[key];
    if (galleryAttrFilters[key] && exclusive[key]) galleryAttrFilters[exclusive[key]] = false;
    if (btn) {
        btn.classList.toggle('active', galleryAttrFilters[key]);
        if (exclusive[key]) {
            const pairBtn = document.querySelector(`.f-btn[data-attr="${exclusive[key]}"]`);
            if (pairBtn) pairBtn.classList.toggle('active', galleryAttrFilters[exclusive[key]]);
        }
    }
    renderGallery();
}
function galleryMatchesFilters(t) {
    if (galleryFilter !== "all" && t.cat !== galleryFilter) return false;
    const m = TEMPLATE_META[t.id] || {};
    if (galleryAttrFilters.ats && m.ats < 85) return false;
    if (galleryAttrFilters.onePage && m.pages !== 1) return false;
    if (galleryAttrFilters.twoPage && m.pages !== 2) return false;
    if (galleryAttrFilters.photo && !m.photo) return false;
    if (galleryAttrFilters.noPhoto && m.photo) return false;
    return true;
}
function renderGallery() {
    const grid = document.getElementById('gallery-grid'); if (!grid) return;
    const list = TEMPLATE_CONFIGS.filter(galleryMatchesFilters);
    const countEl = document.getElementById('gallery-count');
    if (countEl) countEl.textContent = `${list.length} template${list.length === 1 ? '' : 's'}`;
    if (!list.length) {
        grid.innerHTML = `<div class="g-empty">No templates match those filters. <button class="btn btn-sm btn-outline" onclick="resetGalleryFilters()">Reset filters</button></div>`;
        return;
    }
    grid.innerHTML = list.map(t => {
        const m = TEMPLATE_META[t.id] || {};
        return `
    <div class="g-card ${currentTemplateId===t.id?"selected":""}" data-tid="${t.id}" onclick="pickGalleryTemplate('${t.id}')">
        <div class="g-thumb" data-thumb-id="${t.id}">
            <div class="g-thumb-fallback">${SVGS[t.id] || ''}</div>
        </div>
        <div class="g-badges">
            <span class="g-badge g-badge-ats" title="Estimated ATS-friendliness">${m.ats}% ATS</span>
            ${m.pages === 2 ? `<span class="g-badge">2-page</span>` : ``}
            ${m.photo ? `<span class="g-badge">📷 Photo</span>` : ``}
        </div>
        <div class="g-info">
            <p class="g-name">${t.name}</p>
            <p class="g-cat">${t.desc}</p>
            <p class="g-bestfor">${m.bestFor || ''}</p>
        </div>
        <div class="g-cta">
            <button class="btn btn-sm btn-primary" onclick="event.stopPropagation();pickGalleryTemplate('${t.id}')">Use this template →</button>
        </div>
        <div class="g-overlay"><button class="btn btn-sm">Use This →</button></div>
    </div>`;
    }).join("");
    if (typeof initGalleryThumbs === 'function') initGalleryThumbs();
}
function resetGalleryFilters() {
    galleryFilter = "all";
    galleryAttrFilters = { ats: false, onePage: false, twoPage: false, photo: false, noPhoto: false };
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('.f-btn[data-role="cat"][data-cat="all"]');
    if (allBtn) allBtn.classList.add('active');
    renderGallery();
}
function pickGalleryTemplate(id) {
    if (!cvData) loadData();
    const changed = commitEditorMutation(() => {
        if (!TEMPLATE_REGISTRY.has(id) || id === currentTemplateId) return false;
        currentTemplateId = id; cvData.meta.templateId = id;
        cvData.meta.themeOverrides = cvData.meta.themeOverrides || {};
    }, { force: true, step: 5, updateLabel: true });
    if (changed) navigate('builder');
}

function updateTemplateCatalogCount() {
    const el = document.getElementById('template-count');
    if (el && TEMPLATE_REGISTRY) el.textContent = TEMPLATE_REGISTRY.list().length;
}

function renderHeroCv() {
    const inner = document.getElementById('hero-cv-inner'); if (!inner) return;
    const page = document.createElement('div');
    page.className = 'page'; page.setAttribute('data-template','modern-01');
    page.style.cssText = 'width:794px;min-height:1123px;'; page.style.setProperty('--color-accent','#2F6F63');
    const heroData = JSON.parse(document.getElementById('cv-data').textContent);
    page.innerHTML = renderTemplateContent(heroData, 'modern-01');
    inner.innerHTML = ''; inner.appendChild(page);
}
function renderShowcaseStrip() {
    const strip = document.getElementById('sc-strip'); if (!strip) return;
    strip.innerHTML = TEMPLATE_CONFIGS.slice(0, 14).map(t => `
    <div class="sc-card" onclick="navigate('gallery')">
        <div class="sc-thumb" data-thumb-id="${t.id}"><div class="g-thumb-fallback">${SVGS[t.id] || ''}</div></div>
        <div class="sc-name">${t.name}</div>
        <div class="sc-cat">${t.cat}</div>
    </div>`).join("");
}

let _resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => {
        scalePreviewToFit();
        if (isMobilePreviewOpen) { mobilePreviewZoom = null; requestAnimationFrame(fitMobilePreviewToFit); }
        if (window.innerWidth >= 768 && isMobilePreviewOpen) {
            closeMobilePreview();
        }
    }, 120);
});

// ---------- CREDIT BADGE + PAYMENT RETURN ----------
async function updateGlobalCreditBadge() {
    const badges = document.querySelectorAll('.credit-badge');
    if (!badges.length || !window.mellowSupabase) return;
    let session = null;
    try {
        const { data } = await window.mellowSupabase.auth.getSession();
        session = data.session;
    } catch (e) { return; }
    if (!session) { badges.forEach(b => { b.style.display = 'none'; }); return; }
    const status = window.checkSessionStatus ? await window.checkSessionStatus(session.access_token) : null;
    if (!status || typeof status.credits_remaining !== 'number') { badges.forEach(b => { b.style.display = 'none'; }); return; }
    const n = status.credits_remaining;
    badges.forEach(b => {
        b.style.display = 'inline-flex';
        b.textContent = `${n} ${n === 1 ? 'credit' : 'credits'}`;
    });
}
window.updateGlobalCreditBadge = updateGlobalCreditBadge;

async function handlePaymentReturn() {
    const params = new URLSearchParams(location.search);
    if (!params.has('pw_return')) return;
    // Strip the query params immediately so a refresh doesn't re-trigger this.
    history.replaceState({}, '', location.pathname + location.hash);

    if (!window.mellowSupabase) return;
    let session = null;
    try {
        const { data } = await window.mellowSupabase.auth.getSession();
        session = data.session;
    } catch (e) { return; }
    if (!session || !window.checkSessionStatus) return;

    const finish = (status) => {
        const n = status.credits_remaining;
        showToast(`CV download unlocked — you now have ${n} ${n === 1 ? 'credit' : 'credits'}`, 'success');
        const creditBadgeEl = document.getElementById('pw-credit-badge');
        if (creditBadgeEl) creditBadgeEl.textContent = `${n} ${n === 1 ? 'credit' : 'credits'} remaining`;
        if (window.pwGoToStep) window.pwGoToStep('unlocked');
        if (window.showPaywall) window.showPaywall();
        updateGlobalCreditBadge();
    };

    let status = await window.checkSessionStatus(session.access_token);
    if (status && status.credits_remaining > 0) { finish(status); return; }

    // PayFast's ITN webhook can lag a second or two behind the browser
    // redirect, so poll a few times before giving up.
    const confirmToast = showToast('Confirming your payment…', 'loading');
    let confirmed = false;
    for (let attempt = 0; attempt < 5; attempt++) {
        await new Promise(r => setTimeout(r, 2000));
        status = await window.checkSessionStatus(session.access_token);
        if (status && status.credits_remaining > 0) { confirmed = true; break; }
    }
    confirmToast.classList.remove('show');
    setTimeout(() => confirmToast.remove(), 300);

    if (confirmed) {
        finish(status);
    } else {
        showToast("We're still confirming your payment — refresh in a moment if your credits don't appear.", 'info');
    }
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', async () => {
    loadData();
    loadAllCoverLetters();
    lastSavedAt = Date.now();
    if (!loadSharedResume()) {
        const initialView = hashToView(location.hash);
        history.replaceState({ view: initialView }, '', initialView === 'landing' ? '#' : '#' + initialView);
        navigate(initialView, { skipHistory: true });
    }
    updateTemplateCatalogCount();
    renderHeroCv();
    renderShowcaseStrip();
    updateGlobalCreditBadge();
    handlePaymentReturn();
});

window.exportPDFDirect = exportPDFDirect;
window.exportCoverLetterPDFDirect = exportCoverLetterPDFDirect;

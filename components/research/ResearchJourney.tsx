'use client';import{useState}from"react";import BilingualText from"@/components/site/BilingualText";const details=[
 ["Define the real operating need and constraints.","বাস্তব প্রয়োজন ও সীমাবদ্ধতা নির্ধারণ।","Problem brief","সমস্যার সংক্ষিপ্ত বিবরণ"],
 ["Organize evidence, users and operating context.","তথ্য, ব্যবহারকারী ও কাজের প্রেক্ষাপট সংগঠিত করা।","Research notes","গবেষণা নোট"],
 ["Translate requirements into a reviewable system.","প্রয়োজনকে পর্যালোচনাযোগ্য ব্যবস্থায় রূপ দেওয়া।","Design concept","নকশা ধারণা"],
 ["Build the smallest useful testable representation.","কার্যকর ক্ষুদ্রতম পরীক্ষাযোগ্য রূপ তৈরি।","Prototype","প্রোটোটাইপ"],
 ["Evaluate assumptions safely and proportionately.","নিরাপদ ও যথাযথভাবে অনুমান যাচাই।","Test record","পরীক্ষা নথি"],
 ["Apply evidence, document changes and repeat.","প্রমাণ প্রয়োগ, পরিবর্তন নথিভুক্ত ও পুনরাবৃত্তি।","Revision","সংশোধন"],
 ["Prepare an appropriate handover or field use plan.","উপযুক্ত হস্তান্তর বা মাঠ-ব্যবহার পরিকল্পনা।","Deployment plan","প্রয়োগ পরিকল্পনা"],
]as const;
export default function ResearchJourney({steps}:{steps:readonly(readonly[string,string])[]}){const[active,setActive]=useState(0);return <div className="research-journey"><div className="journey-line" aria-hidden="true"><span style={{width:`${(active/(steps.length-1))*100}%`}}/></div><ol>{steps.map((step,index)=><li key={step[0]} className={active===index?"active":""}><button onClick={()=>setActive(index)} onFocus={()=>setActive(index)} aria-current={active===index?"step":undefined}><span>{String(index+1).padStart(2,"0")}</span><b><BilingualText en={step[0]} bn={step[1]}/></b><p><BilingualText en={details[index][0]} bn={details[index][1]}/></p><small><BilingualText en={details[index][2]} bn={details[index][3]}/></small></button></li>)}</ol></div>}

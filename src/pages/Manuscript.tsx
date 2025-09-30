import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Manuscript = () => {
  const manuscripts = [
    { sr: 1, title: "Rasail Ibn ul Amid", author: "ibn-ul-Amid", year: "", call: "31/23" },
    { sr: 2, title: "Tarikh Qazai", author: "", year: "", call: "22/19" },
    { sr: 3, title: "Qalaid-ul-Jamal Halat Qutul Arab", author: "", year: "ba-ile 978 Hijri", call: "22/44" },
    { sr: 4, title: "Ar Risalatul Musammat", author: "Al Qutrub un Nahvi", year: "", call: "25/6" },
    { sr: 5, title: "Khazanat-ul-Khayal", author: "Mohd. Momin", year: "16th Century", call: "31/21" },
    { sr: 6, title: "Wafiyatul Ayan", author: "Ahmad Shamsuddin", year: "1194", call: "19/14" },
    { sr: 7, title: "Asmaur-Rijalus-Sahihen", author: "Abul Fazal Mohd Bin Tahir", year: "978 Hijri", call: "4/3" },
    { sr: 8, title: "Mujame Zahbi", author: "Zahbi", year: "", call: "4/28" },
    { sr: 9, title: "Tarikh Taimuri", author: "", year: "1232", call: "22/17" },
    { sr: 10, title: "Anwar-ur-Rabi", author: "", year: "", call: "" },
    { sr: 11, title: "Sarah Lugat ki Kitab", author: "Jamalul Qarshi", year: "1025 Hijri", call: "25/17" },
    { sr: 12, title: "Jawahir-ul-Maziyah", author: "Sheikh Mohi Uddin", year: "", call: "4/12" },
    { sr: 13, title: "Isabah Fi Tameez Sahabah", author: "Hajar Asqalani", year: "", call: "4/4" },
    { sr: 14, title: "Al Alam be Alamil Masjidul Haram", author: "Qutubuddin Qadri", year: "", call: "22/6" },
    { sr: 15, title: "Tarikh Ibne Qutaiba", author: "Ibne Qutaiba", year: "", call: "22/11" },
    { sr: 16, title: "Ahwal Imam Ham wa Aulad-e-Rasool", author: "Sheikh Noor Uddin", year: "972 Hijri", call: "19/26" },
    { sr: 17, title: "Majma-ul-Bahrain", author: "", year: "1102 Hijri", call: "4/27" },
    { sr: 18, title: "Jugrafiyatul Arz", author: "", year: "1021", call: "22/26" },
    { sr: 19, title: "Nihatah", author: "", year: "1208", call: "4/8" },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
          Manuscript Collection
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
          Explore our extensive manuscript collection, featuring unique and rare documents 
          that illuminate the history and culture of significant eras. This collection includes handwritten 
          letters, diaries, legal documents, and more, offering invaluable insights into 
          the lives and thoughts of individuals from ancient times.
        </p>

        {/* Table */}
        <Card className="card-premium rounded-2xl overflow-hidden">
          <CardContent className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground text-left">
                  <th className="px-4 py-3">Sr No.</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Call No.</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                {manuscripts.map((item) => (
                  <tr
                    key={item.sr}
                    className="border-b border-border hover:bg-background-secondary transition"
                  >
                    <td className="px-4 py-3">{item.sr}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.title}</td>
                    <td className="px-4 py-3">{item.author || "-"}</td>
                    <td className="px-4 py-3">{item.year || "-"}</td>
                    <td className="px-4 py-3">{item.call || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Manuscript;

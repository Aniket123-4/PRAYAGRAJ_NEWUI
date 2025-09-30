import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function History() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            History
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A Glimpse into the Glorious Past of Prayagraj Public Library
          </p>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            { label: "Established", value: "1864" },
            { label: "Location", value: "Chandrashekhar Azad Park, Prayagraj" },
            { label: "Architect", value: "Richard Roskell Bayne" },
            { label: "Architecture Style", value: "Scottish Baronial Revival" },
            { label: "Collection", value: "125,000 Books, 40 Magazines, 28 Newspapers" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card className="card-premium hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">
                    {item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-lg">
                  {item.value}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Narrative Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="card-premium p-8 shadow-xl">
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Established in <strong>1864</strong>, the Prayagraj Public Library is the largest
                library in Uttar Pradesh. During the British Raj, the monument served as the
                <strong> legislative assembly</strong> when Allahabad was the capital of the
                United Provinces. In <strong>1879</strong>, the library was shifted to its present
                location at <strong>Chandrashekhar Azad Park</strong>.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                The magnificent building, known as the <strong>Thornhill Mayne Memorial</strong>,
                stands as a symbol of heritage. Designed by <strong>Richard Roskell Bayne</strong>{" "}
                in the <strong>Scottish Baronial Revival</strong> style, it features sharp pillars
                and turrets made of granite and sandstone, making it a landmark of architectural
                brilliance.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

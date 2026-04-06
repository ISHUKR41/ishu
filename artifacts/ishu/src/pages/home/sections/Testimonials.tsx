import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "SSC CGL Aspirant",
    content: "Ishu has been my daily companion for the last year. The PDF tools are incredibly fast, and I get all my exam updates in one place. Best platform for Indian students!",
    rating: 5,
    avatar: "R"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Engineering Student",
    content: "The news section is fantastic. I love how it's categorized and I can read it in Gujarati too. The interface is much cleaner than any other government job portal.",
    rating: 5,
    avatar: "P"
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Banking Aspirant",
    content: "I used to check 5 different websites every day for IBPS updates. Now I just check Ishu. The WhatsApp alerts feature is a lifesaver.",
    rating: 5,
    avatar: "A"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Indian Students</h2>
          <p className="text-muted-foreground text-lg">
            See what our community has to say about their experience with Ishu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 relative"
            >
              <div className="flex gap-1 mb-6 text-orange-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              
              <p className="text-foreground/90 italic mb-8 relative z-10">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

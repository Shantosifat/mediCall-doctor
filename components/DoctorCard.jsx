import { User, Star, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DoctorCard({ doctor }) {
  return (
    <Card className="border-emerald-900/20 hover:border-emerald-700/40 transition-all">
      <CardContent className="p-6 bg-gradient-to-r from-emerald-900/10 to-emerald-900/5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Doctor avatar */}
          <div className="relative w-16 h-16 flex-shrink-0">
            {doctor.imageUrl ? (
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-emerald-900/20 flex items-center justify-center border-2 border-emerald-400">
                <User className="h-6 w-6 text-emerald-400" />
              </div>
            )}
            {/* Optional online indicator */}
            <span
              className="absolute bottom-0 right-0 block w-4 h-4 rounded-full bg-green-400 border-2 border-background"
              title="Online"
            />
          </div>

          {/* Doctor details */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
              <h3 className="font-semibold text-white text-lg">
                {doctor.name}
              </h3>
              <Badge
                variant="outline"
                className="bg-emerald-900/20 border-emerald-900/30 text-emerald-400 flex items-center gap-1 text-sm"
              >
                <Star className="h-3 w-3" />
                Verified
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-2">
              {doctor.specialty} • {doctor.experience} yrs experience
            </p>

            {doctor.description && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {doctor.description}
              </p>
            )}

            <Button
              asChild
              className="w-full bg-emerald-500 hover:bg-emerald-600 mt-auto flex items-center justify-center gap-2"
            >
              <Link href={`/doctors/${doctor.specialty}/${doctor.id}`}>
                <Calendar className="h-4 w-4" />
                View Profile & Book
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

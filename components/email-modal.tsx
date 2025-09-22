import { use, useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useReport } from "@/contexts/result-context";
import type { Section } from "@/lib/types/analysis-type";
import { Mail } from "lucide-react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailModalTrigger(props: ButtonProps) {
  const { getAnalyses } = useReport();

  if (!props.disabled) {
    if (getAnalyses === null) throw new Error();

    const _ = use(getAnalyses);
  }

  return (
    <Button variant="outline" className="flex items-center gap-2" {...props}>
      <Mail className="h-4 w-4" />
      Email ke saya
    </Button>
  );
}

export function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const { id, getAnalyses, report } = useReport();
  const [isSubmitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  if (getAnalyses === null || report === null)
    throw new Error("getAnalyses and BigFive Report should be provided");

  const data = use(getAnalyses);

  let sections: Section[] = [];

  if ("analyses" in data) sections = data.analyses[0].sections;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setSubmitting(() => true);
    try {
      await axios.post("/api/report/pdf", {
        id,
        sections,
        report: report.results,
        ...formData,
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(() => false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Hasil ke Saya</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Batal
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              Kirim Email
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

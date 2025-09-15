"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  bigFiveCode: string
}

export function EmailModal({ isOpen, onClose, bigFiveCode }: EmailModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    email: "",
    receiveUpdates: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email with the results
    console.log("Sending email with data:", { ...formData, bigFiveCode })
    alert("Email berhasil dikirim!")
    onClose()
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
            <Label htmlFor="age">Usia</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sex">Jenis Kelamin</Label>
            <Select value={formData.sex} onValueChange={(value) => handleInputChange("sex", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Laki-laki</SelectItem>
                <SelectItem value="female">Perempuan</SelectItem>
                <SelectItem value="other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="updates"
              checked={formData.receiveUpdates}
              onCheckedChange={(checked) => handleInputChange("receiveUpdates", checked as boolean)}
            />
            <Label htmlFor="updates" className="text-sm">
              Saya ingin menerima update dan informasi terbaru
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              Kirim Email
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

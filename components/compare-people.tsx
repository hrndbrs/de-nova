"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "./ui/table";
import { DeleteIcon, EditIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useState } from "react";
import { base64url, formatId, validId } from "@/lib/helpers/string";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { cn } from "@/lib/utils";

interface CompareProps {
  paramId?: string;
}

export const ComparePeople = ({ paramId }: CompareProps) => {
  const router = useRouter();
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "id",
      label: "ID",
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  type Row = {
    id: string;
    name: string;
  };
  const [rows, setRows] = useState<Row[]>([]);
  const [name, setName] = useState<string>("");
  const [id, setId] = useState(paramId ?? "");

  const [editName, setEditName] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number>();
  const [isOpen, setOpen] = useState(false);

  const isInvalidId = React.useMemo(() => {
    if (id === "") return false;

    const newId = formatId(id);
    if (rows.some((item) => item.id === newId)) return true;

    return !validId(newId);
  }, [id, rows]);

  const isInvalidEditId = React.useMemo(() => {
    if (editId === "") return false;

    const newId = formatId(editId);
    return !validId(newId);
  }, [editId]);

  function deleteItem(id: string) {
    setRows((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  }

  function addPerson() {
    const newId = formatId(id);
    if (name && id && !isInvalidId) {
      setRows((prev) => {
        return [...prev, { id: newId, name }];
      });
      setName("");
      setId("");
    }
  }

  function comparePeople() {
    const urlParam = base64url.encode(JSON.stringify(rows));
    router.push(`/compare/${urlParam}`);
  }

  function onOpenEditPerson(onOpen: () => void, item: Row) {
    setEditName(item.name);
    setEditId(item.id);
    setEditIndex(rows.findIndex(({ id }) => id === item.id));
    onOpen();
  }

  function editPerson(onClose: () => void) {
    const newId = formatId(editId);
    if (editName && editId && !isInvalidEditId && editIndex !== undefined) {
      setRows((prev) => {
        const updatedRows = [...prev];
        updatedRows[editIndex] = { id: newId, name: editName };
        return updatedRows;
      });
      setEditName("");
      setEditId("");
      setEditIndex(undefined);
      onClose();
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 mt-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 items-start">
        <Input
          type="text"
          autoFocus
          placeholder="Name: e.g. Arthur Dent"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="ResultID: e.g. 58a70606a835c400c8b38e84"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <Button
          color="primary"
          onClick={addPerson}
          disabled={!name || !id || isInvalidId}
        >
          Tambah
        </Button>
      </div>
      <div>
        {rows.length < 1 ? (
          <p className="p-3 text-center">Belum ada data</p>
        ) : (
          <Table aria-label="List of persons to compare">
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn(column.key === "actions" ? "w-20" : null)}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) =>
                    column.key === "actions" ? (
                      <TableCell className="flex justify-end gap-1">
                        <Button
                          aria-label="Edit"
                          onClick={() =>
                            onOpenEditPerson(() => setOpen(true), item)
                          }
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          aria-label="Delete"
                          onClick={() => deleteItem(item.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    ) : (
                      //@ts-ignore
                      <TableCell>{item[column.key]}</TableCell>
                    ),
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Button
          color="primary"
          className="mt-4"
          disabled={rows.length < 2}
          onClick={comparePeople}
        >
          Bandingkan Hasil
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={() => setOpen(false)}>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-1">
            Edit person
          </DialogHeader>
          <div>
            <Input
              type="text"
              autoFocus
              placeholder="Arthur Dent"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="58a70606a835c400c8b38e84"
              value={editId}
              onChange={(e) => setEditId(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button color="danger" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button
              color="primary"
              onClick={() => editPerson(() => setOpen(false))}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

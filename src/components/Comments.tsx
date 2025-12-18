import { useMemo, useState } from "react";
import type { Comment, PostType } from "@/types/models";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatDateTime, uid } from "@/utils/format";
import { loadJson, saveJson } from "@/utils/storage";

function storageKey(type: PostType, slug: string) {
  return `comments:${type}:${slug}`;
}

export default function Comments({ postType, postSlug }: { postType: PostType; postSlug: string }) {
  const key = useMemo(() => storageKey(postType, postSlug), [postType, postSlug]);
  const [items, setItems] = useState<Comment[]>(() => loadJson<Comment[]>(key, []));
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  function submit() {
    const c: Comment = {
      id: uid("c"),
      postType,
      postSlug,
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [c, ...items];
    setItems(next);
    saveJson(key, next);
    setText("");
  }

  return (
    <Card>
      <CardHeader>
        <div className="font-semibold">Bình luận</div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Tên</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2 text-sm outline-none"
              placeholder="Nhập tên"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Nội dung</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 w-full min-h-24 rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2 text-sm outline-none"
              placeholder="Viết bình luận..."
            />
          </div>
          <div>
            <Button type="button" disabled={!name.trim() || !text.trim()} onClick={submit}>
              Gửi
            </Button>
            <div className="mt-2 text-xs text-slate-500">Lưu local trên trình duyệt (placeholder).</div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-sm text-slate-600">Chưa có bình luận.</div>
          ) : (
            items.map((c) => (
              <div key={c.id} className="rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-slate-500">{formatDateTime(c.createdAt)}</div>
                </div>
                <div className="mt-2 text-sm text-slate-700 whitespace-pre-line">{c.text}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

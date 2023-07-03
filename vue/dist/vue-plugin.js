var ct = (m, t, e) => {
  if (!t.has(m))
    throw TypeError("Cannot " + e);
};
var f = (m, t, e) => (ct(m, t, "read from private field"), e ? e.call(m) : t.get(m)), A = (m, t, e) => {
  if (t.has(m))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(m) : t.set(m, e);
}, $ = (m, t, e, s) => (ct(m, t, "write to private field"), s ? s.call(m, e) : t.set(m, e), e);
var mt = (m, t, e) => (ct(m, t, "access private method"), e);
import { defineComponent as xt, ref as B, onMounted as wt, openBlock as bt, createElementBlock as kt, createElementVNode as q, normalizeClass as J } from "vue";
const ut = "&lt;", it = "&gt;", dt = "/";
var z, G, I, R, K, X, Y, P, Z, lt, Tt;
class Dt {
  constructor(t, e = !1) {
    A(this, lt);
    A(this, z, []);
    A(this, G, "");
    A(this, I, "");
    A(this, R, []);
    A(this, K, []);
    A(this, X, []);
    A(this, Y, []);
    A(this, P, []);
    A(this, Z, []);
    $(this, G, t.trim()), $(this, I, `${f(this, G)}
<Eof />`), this.protect(), e && this.markupQuotes(), this.collectWords(f(this, I)), this.makeMistakes();
  }
  get list() {
    return f(this, z);
  }
  get text() {
    return f(this, G);
  }
  get workingText() {
    return f(this, I);
  }
  get words() {
    return f(this, R);
  }
  get mistakes() {
    return f(this, P);
  }
  get mistakeCursors() {
    return f(this, Z);
  }
  get phraseStarts() {
    return f(this, K);
  }
  get phraseLengths() {
    return f(this, X);
  }
  get wordEnds() {
    return f(this, Y);
  }
  translateBracket(t, e, s = !1) {
    let n = t, r = !1;
    return "CDETQRG".includes(e) && (e === "C" && (n = s ? ")" : "(", r = !0), e === "D" && (n = s ? "}}" : "{{", r = !0), e === "E" && (n = s ? "}" : "{", r = !0), e === "T" && (n = s ? "]" : "[", r = !0), e === "Q" && (n = "'", r = !0), e === "R" && (n = '"', r = !0), e === "G" && (n = "`", r = !0)), { word: n, translated: r };
  }
  markupQuotes() {
    let t = f(this, I);
    const e = /(["'`])((\s|((\\)*)\\.|.)*?)\1/gm;
    let s;
    const n = [];
    for (; (s = e.exec(t)) !== null; )
      s.index === e.lastIndex && e.lastIndex++, n.push(s);
    for (let r = n.length - 1; r > -1; r--) {
      const h = n[r], c = h[1], u = h[0];
      let i = h[2];
      const d = h.index + 1, l = d + u.length - 1;
      let g = "";
      c === '"' ? g = "R" : c === "'" ? g = "Q" : c === "`" && (g = "G"), i = i.replace(/&lt;/g, "&pp;"), i = i.replace(/&gt;/g, "&pg;");
      const x = `&oq;${g}&cq;${i}&oq;/${g}&cq;`, k = t.substring(0, d - 1), p = t.substring(l);
      t = k + x + p;
    }
    $(this, I, t);
  }
  doAttributes(t) {
    const e = {}, s = /([\w]*)(\[\])?=("([\S ][^"]*)"|'([\S]*)'|\{\{ ([\w]*) \}\}|\{([\S ]*)\})/gm;
    let n;
    const r = [];
    for (; (n = s.exec(t)) !== null; )
      n.index === s.lastIndex && s.lastIndex++, r.push(n);
    for (let h = 0; h < r.length; h++) {
      const c = r[h], u = c[1], i = c[2], d = c[3].substring(0, 1), l = c[4];
      i === "[]" ? (e[u] === void 0 && (e[u] = []), e[u].push(d + l)) : e[u] = `${d}${l}`;
    }
    return e;
  }
  isClosedTag(t) {
    let e = !1;
    const { text: s } = t;
    return s === "" || (e = s.substring(s.length - 5, s.length) === dt + it), e;
  }
  isCloserTag(t) {
    let e = !1;
    const { text: s } = t;
    return s === "" || (e = s.substring(0, 5) === ut + dt), e;
  }
  makeTag(t, e, s, n, r = !1) {
    const { text: h } = t, { name: c } = t, u = this.list.length, i = {};
    return i.id = t.id, i.name = c === "" ? "Fragment" : c, i.text = h, i.startsAt = t.startsAt, i.endsAt = t.endsAt, r || (i.uid = mt(this, lt, Tt), i.method = "echo", i.props = i.name === "Fragment" ? [] : [], i.depth = s, i.hasCloser = n, i.node = !1, i.isSingle = !1), (e[s] === void 0 || e[s] === null) && (e[s] = u - 1), i.parentId = e[s], i;
  }
  protect() {
    let t = f(this, I);
    t = t.trim(), t = t.replace(/\{\{/g, "<D>"), t = t.replace(/\}\}/g, "</D>"), t = t.replace(/\(/g, "<C>"), t = t.replace(/\)/g, "</C>"), t = t.replace(/\{/g, "<E>"), t = t.replace(/\}/g, "</E>"), t = t.replace(/\[/g, "<T>"), t = t.replace(/\]/g, "</T>"), t = t.replace(/<([/\w])/g, `${ut}$1`), t = t.replace(/>/g, it), $(this, I, t);
  }
  collectTags(t, e = "[\\w]+") {
    const s = [], n = [], r = `${ut}\\/?(${e})((\\s|.*?)*?)\\/?${it}`, h = new RegExp(r, "gm");
    let c;
    for (; (c = h.exec(t)) !== null; )
      c.index === h.lastIndex && h.lastIndex++, n.push(c);
    let u = 0;
    return n.forEach((i) => {
      const d = i;
      d.id = u, d.text = i[0], d.name = i[1] === null ? "Fragment" : i[1], d.startsAt = i.index, d.endsAt = i.index + d.text.length - 1, delete d[0], delete d[1], delete d[2], delete d[3], s.push(d), u++;
    }), s;
  }
  collectWords(t) {
    const e = [], s = [];
    let n = /([&oqpg;]{4})[\w /]+([&cqpp;]{4})/gm, r;
    for (; (r = n.exec(t)) !== null; )
      r.index === n.lastIndex && n.lastIndex++, s.push(r);
    let h = t;
    for (let c = s.length - 1; c > -1; c--) {
      const u = s[c][0], i = s[c].index + 1, d = i + u.length - 1, l = "•".repeat(u.length), g = h.substring(0, i - 1), x = h.substring(d);
      h = g + l + x;
    }
    for (n = /([&lt;]{4})[\w /]+([&gt;]{4})/gm; (r = n.exec(h)) !== null; )
      r.index === n.lastIndex && n.lastIndex++, s.push(r);
    for (let c = s.length - 1; c > -1; c--) {
      const u = s[c][0], i = s[c].index + 1, d = i + u.length - 1, l = "•".repeat(u.length), g = h.substring(0, i - 1), x = h.substring(d);
      h = g + l + x;
    }
    for (n = /([&ltgt;]{4})/gm; (r = n.exec(h)) !== null; )
      r.index === n.lastIndex && n.lastIndex++, s.push(r);
    for (let c = s.length - 1; c > -1; c--) {
      const u = s[c][0], i = s[c].index + 1, d = i + u.length - 1, l = "•".repeat(u.length), g = h.substring(0, i - 1), x = h.substring(d);
      h = g + l + x;
    }
    for (n = /((?!•)\S[^•\n]*)/g; (r = n.exec(h)) !== null; )
      r.index === n.lastIndex && n.lastIndex++, f(this, K).push(r.index), f(this, X).push(r[0].length);
    for (n = /((?!•)\S[^•\n ]*)/g; (r = n.exec(h)) !== null; ) {
      r.index === n.lastIndex && n.lastIndex++;
      const c = {};
      c.text = r[0], c.startsAt = r.index, c.endsAt = c.startsAt + r[0].length - 1, e.push(c), f(this, Y).push(c.endsAt);
    }
    $(this, R, e);
  }
  makeMistakes() {
    let t = Math.ceil(Math.random() * 2) - 2;
    const e = Math.ceil(Math.random() * 3) + 2;
    f(this, R).forEach((s) => {
      if (t++, t % e !== 0 || s.text.length < 4)
        return;
      const n = Math.ceil(Math.random() * s.text.length) - 1, r = String.fromCharCode(
        Math.ceil(Math.random() * 26) + 96
      );
      f(this, Z).push(s.startsAt + n), f(this, P).push(r);
    });
  }
  makeFaultyText() {
    let t = f(this, I);
    f(this, P).forEach((e) => {
      const s = t.substring(0, e.startsAt), n = t.substring(e.endsAt + 1);
      t = s + e.text + n;
    }), $(this, I, t);
  }
  splitTags(t) {
    let e = [...t], s = e.length, n = 0, r = !1, h = 0;
    const c = s;
    let u = !1;
    const i = [], d = [];
    for (; e.length > 0 && !r && !u; ) {
      if (n === s) {
        if (n = 0, e = Object.values(e), s = e.length, s === 0) {
          r = !0;
          continue;
        }
        h++, u = h > c + 1;
      }
      const l = e[n];
      if (e.length === 1 && l.name === "Eof") {
        r = !0;
        continue;
      }
      if (this.isClosedTag(l) && l.name !== "Eof") {
        d[n] = e[n], delete e[n], n++;
        continue;
      }
      if (n + 1 < s) {
        const g = e[n + 1];
        if (!this.isCloserTag(l) && this.isCloserTag(g)) {
          if (l.name !== g.name) {
            i.push(l), delete e[n], n++;
            continue;
          }
          d[n] = e[n], d[n + 1] = e[n + 1], delete e[n], delete e[n + 1], n += 2;
          continue;
        }
      }
      n++;
    }
    return { regularTags: d, singleTags: i };
  }
  replaceTags(t, e) {
    let s = t, n = e;
    const r = [];
    e.forEach((h) => {
      r[h.id] = h;
    }), r.sort(), n = Object.values(r);
    for (let h = n.length - 1; h > -1; h--) {
      const c = n[h];
      c.text = c.text.substring(0, c.text.length - 4) + dt + it;
      const u = s.substring(0, c.startsAt), i = s.substring(c.endsAt + 1);
      s = u + c.text + i;
    }
    return s;
  }
  doComponents(t = "[\\w]+") {
    let e = f(this, I);
    const s = this.collectTags(e, t), n = [];
    let r = [], h = 0;
    const c = [];
    let u = s.length, i = 0, d = !1, l = 0;
    const g = u;
    let x = !1;
    c[h] = -1;
    const { singleTags: k } = this.splitTags(s);
    let p = s;
    for (k.length && (k.forEach((b) => n.push(b.id)), e = this.replaceTags(e, k), p = this.collectTags(e, t)); p.length > 0 && !d && !x; ) {
      if (i === u) {
        if (i = 0, p = Object.values(p), u = p.length, u === 0) {
          d = !0;
          continue;
        }
        l++, x = l > g + 1;
      }
      const b = p[i];
      if (p.length === 1 && b.name === "Eof") {
        d = !0;
        continue;
      }
      if (this.isClosedTag(b) && b.name !== "Eof") {
        const C = this.makeTag(b, c, h, !1);
        C.isSingle = n.includes(b.id), r[C.id] = C, delete p[i], i++;
        continue;
      }
      if (this.isCloserTag(b) && h--, i + 1 < u) {
        const C = p[i + 1];
        if (!this.isCloserTag(b) && this.isCloserTag(C)) {
          const M = this.makeTag(b, c, h, !0), S = this.makeTag(
            C,
            c,
            h,
            !1,
            !0
          );
          S.contents = {}, S.parentId = M.id, S.contents.startsAt = M.endsAt + 1, S.contents.endsAt = S.startsAt;
          const ot = e.substring(
            S.contents.startsAt,
            S.contents.endsAt
          );
          S.contents.text = ot, M.closer = S, r[M.id] = M, delete p[i], delete p[i + 1], i += 2;
          continue;
        }
        !this.isCloserTag(b) && !this.isCloserTag(C) && (h++, c[h] = b.id);
      }
      i++;
    }
    r = Object.values(r), $(this, I, e), $(this, z, r);
  }
}
z = new WeakMap(), G = new WeakMap(), I = new WeakMap(), R = new WeakMap(), K = new WeakMap(), X = new WeakMap(), Y = new WeakMap(), P = new WeakMap(), Z = new WeakMap(), lt = new WeakSet(), Tt = function() {
  return Date.now() * Math.random();
};
const L = "&lt;", O = "&gt;", j = "<", N = ">", W = "/", D = `
`;
var tt, Q, et, U, V;
class vt {
  constructor(t, e, s, n, r) {
    A(this, tt, "");
    A(this, Q, 60);
    A(this, et, !1);
    A(this, U, () => {
    });
    A(this, V, () => {
    });
    $(this, U, t), $(this, tt, e), $(this, Q, s), $(this, V, r), $(this, et, n);
  }
  async writeLikeAHuman(t, e) {
    const s = e !== void 0, n = f(this, U).querySelector(
      `pre.to-place.${e} code`
    ), r = f(this, U).querySelector(
      s ? `pre.to-write.${t} code` : `div.to-write.${t}`
    );
    let h = f(this, Q), c = [], u = "", i = "", d = "", l = null, g = [];
    const x = [];
    let k = "", p = "", b = -1;
    const C = [], M = [];
    let S = 0, ot = this;
    function ht(o) {
      return new Promise((a) => {
        setTimeout(a, o);
      });
    }
    function yt(o) {
      return Math.floor(o * 0.75 + Math.random() * o);
    }
    async function E(o, a = !1) {
      let v = c.join("");
      a && (v = v.trim()), h = yt(f(ot, Q)), u += o, r.innerHTML = u + v, s && window.hljs !== void 0 && window.hljs.highlightElement(r), await ht(h);
    }
    async function Et() {
      const o = c.join("");
      u = u.substring(0, u.length - 1), r.innerHTML = u + o, await ht(h);
    }
    function H(o) {
      c.unshift(o);
    }
    function st() {
      delete c[0], c = Object.values(c);
    }
    function At(o) {
      const a = [], v = /^([^\S][ \s]+)*/gm;
      let _;
      for (; (_ = v.exec(o)) !== null; )
        _.index === v.lastIndex && v.lastIndex++, a.push(_[0] ?? "");
      return a;
    }
    function Ct(o) {
      const a = /^([^\S][ \s]+)*/gm;
      return o.replace(a, "");
    }
    function St(o) {
      const a = o.split(`
`);
      return `<br />
`.repeat(a.length);
    }
    async function $t(o) {
      let a = "";
      return await fetch(o).then((v) => v.text()).then((v) => {
        a = v;
      }), a;
    }
    function It(o) {
      return o.replaceAll(
        L,
        j
      ).replaceAll(O, N);
    }
    function Lt() {
      let o = null;
      return g.length && (o = g.shift(), o.hasCloser && x.push(o)), o;
    }
    function _t() {
      return x.length ? x[x.length - 1] : null;
    }
    function Ot() {
      if (!C.length)
        return null;
      const o = C.pop(), a = M.pop();
      H(a ? D + i + o : o);
    }
    function ft(o) {
      let a = null;
      if (!x.length || (a = _t(), o === a.depth))
        return a;
      let v = !1;
      for (let _ = x.length - 1; _ > -1; _--)
        if (a = x[_], o === a.depth) {
          v = !0;
          break;
        }
      return v ? a : null;
    }
    const Mt = f(this, tt);
    k = await $t(Mt);
    const gt = At(k);
    k = Ct(k);
    const T = new Dt(k, s);
    if (T.doComponents(), g = [...T.list], p = T.workingText.replace(
      `${D + L}Eof ${W}${O}`,
      ""
    ), s) {
      console.log({ sourceComponent: n });
      const o = St(k + `
`);
      console.log({ emptyText: o }), n.innerHTML = o, window.hljs !== void 0 && window.hljs.highlightElement(n);
    }
    const jt = gt[S] ?? "";
    await E(jt), S++;
    for (let o = 0; o < p.length; o++) {
      let a = p[o];
      if (s && a === j) {
        a = L, await E(a);
        continue;
      }
      if (f(this, et) && T.mistakes.length && T.phraseStarts.length && T.phraseStarts[0] === o) {
        const y = T.phraseLengths[0];
        for (let w = 0; w < y; w++) {
          const F = o + w, rt = T.mistakeCursors[0];
          if (a = p[F], rt === F ? await E(T.mistakes[0]) : await E(a), T.wordEnds.includes(F) && T.mistakeCursors.length) {
            const nt = T.mistakeCursors[0];
            if (nt <= F) {
              const at = F - nt + 1;
              for (let pt = 0; pt < at; pt++)
                await Et(), w--;
              T.mistakes.shift(), T.mistakeCursors.shift();
            }
          }
        }
        T.phraseStarts.shift(), T.phraseLengths.shift(), o += y - 1;
        continue;
      }
      const v = p.substring(o, o + 4), _ = p.substring(o, o + 5);
      if (a === "&" && _ === "&oq;/") {
        const y = p.substring(o + 5, o + 6), { word: w } = T.translateBracket(a, y);
        st(), await E(w), o += 9;
        continue;
      }
      if (a === "&" && v === "&oq;") {
        const y = p.substring(o + 4, o + 5), { word: w } = T.translateBracket(a, y);
        H(w), await E(w), o += 8;
        continue;
      }
      if (a === "&" && v === "&pp;") {
        o += 3, await E(L);
        continue;
      }
      if (a === "&" && v === "&pg;") {
        o += 3, await E(O);
        continue;
      }
      if (s) {
        if (a === "/" && _ === W + O && l !== null && !l.hasCloser && l.endsAt === o + 4) {
          a = W + O, st(), await E(a), o += 4;
          continue;
        }
        if (a === "&" && v === O && l !== null && l.endsAt === o + 3) {
          st(), await E(O), l.hasCloser && Ot(), o += 3;
          continue;
        }
      }
      if (a === "&" && _ === L + W) {
        l = ft(b), l === null && b - 1 > -1 && (l = ft(b - 1)), a = l.closer.text, s || (a = j + W + l.closer.name + N);
        const { word: y } = T.translateBracket(
          a,
          l.name,
          !0
        );
        if (a = y, a !== "") {
          st(), o = l.closer.endsAt, await E(a), b--, l = null;
          continue;
        }
      }
      if (a === "&" && v !== L) {
        const y = p.substring(o).indexOf(";");
        if (y > 8) {
          await E(a);
          continue;
        }
        const w = p.substring(o, o + y + 1);
        await E(w), o += w.length - 1;
        continue;
      }
      if (a === "&" && v === L) {
        if ((l === null || l !== null && l.dirty) && (l = Lt()), l.startsAt !== o) {
          s ? (a = L, o += 3) : (a = l.text.replace(L, j), a = a.replace(O, N)), await E(a), l.dirty = !1;
          continue;
        }
        l.dirty = !0;
        let y = !1, w = "";
        a = l.text, s || (a = l.text.replace(L, j), a = a.replace(O, N));
        const { word: F, translated: rt } = T.translateBracket(
          a,
          l.name
        );
        if (a = F, l.hasCloser) {
          b++, w = l.closer.text, s || (w = j + W + l.closer.name + N);
          const { word: nt, translated: at } = T.translateBracket(
            w,
            l.name,
            !0
          );
          w = nt, y = l.closer.contents.text.indexOf(D) > -1, at ? (o = l.endsAt, H(y ? D + i + w : w)) : (C.push(w), M.push(y));
        }
        rt || (y = l.text.indexOf(D) > -1, s ? (a = L, o += 3, w = O) : (a = l.text.replace(L, j), a = a.replace(O, N), o += l.text.length - 1, w = j + W + l.closer.name + N), H(y ? D + i + w : w)), await E(a);
        continue;
      }
      if (a === D) {
        i = gt[S] ?? "", d = D + i;
        const y = c.length ? c[0].trim() : "", w = p.substring(
          o + 1,
          o + y.length + 1
        );
        S++, await E(d, y === w);
        continue;
      }
      await E(a);
    }
    u = It(u), this.finishedEvent(u);
  }
  finishedEvent(t) {
    typeof f(this, V) == "function" && f(this, V).call(this, t);
  }
}
tt = new WeakMap(), Q = new WeakMap(), et = new WeakMap(), U = new WeakMap(), V = new WeakMap();
const qt = { class: "to-be-placed" }, Bt = { class: "to-be-written" }, Ht = xt({
  name: "CodeWriter"
}), Ft = /* @__PURE__ */ Object.assign(Ht, {
  props: {
    source: {
      default: ""
    },
    speed: {
      default: "60"
    },
    dependsOnSelector: {
      default: ""
    },
    makeTypos: {
      default: !1
    },
    styles: {
      default: ""
    },
    classes: {
      default: ""
    },
    finished: {
      default: !1
    },
    restart: {
      default: !1
    },
    useHighlightJs: {
      default: !1
    },
    theme: {
      default: "base16/monokai"
    },
    language: {
      default: "html"
    }
  },
  setup(m) {
    const t = m, e = B(null), s = B(""), n = B(""), r = B(""), h = B(""), c = () => {
      let d = Date.now().toString();
      return d = d.substring(d.length - 4), d = btoa(d), d = d.replace(/=/g, ""), d;
    };
    s.value = c(), n.value = "to-place-" + s.value, r.value = "to-write-" + s.value, h.value = "to-code-" + s.value, wt(async () => {
      const d = e.value.ownerDocument;
      if (t.useHighlightJs && window.hljs === void 0) {
        const l = t.theme ?? "base16/monokai", g = t.language ?? "html", x = d.createElement("script");
        x.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js", d.head.appendChild(x);
        const k = [];
        k.push(
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
        ), k.push(
          `https://highlightjs.org/static/demo/styles/${l}.css`
        ), k.forEach((b) => {
          const C = d.createElement("style");
          C.innerHTML = `@import "${b}"`, d.head.appendChild(C);
        });
        const p = d.querySelectorAll(h.value);
        for (const b of p)
          b.setAttribute("class", `language-${g}`);
      }
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((x) => {
        const k = d.createElement("style");
        k.innerHTML = `@import "${x}"`, d.head.appendChild(k);
      }), d.getElementById(r.value).setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const l = d.querySelector(t.dependsOnSelector);
        if (l !== null) {
          const g = { attributes: !0 };
          new MutationObserver(
            async (k, p) => {
              for (const b of k)
                b.type === "attributes" && b.attributeName === "finished" && l.getAttribute("finished") === "true" && (p.disconnect(), await i());
            }
          ).observe(l, g);
        }
      } else
        await i();
    });
    const u = function(d) {
      const l = new CustomEvent("finishedWriting", {
        bubbles: !0,
        cancellable: !0,
        detail: {
          content: d
        }
      });
      e.value.dispatchEvent(l), e.value.setAttribute("finished", "true");
    }, i = async () => {
      const d = e.value.ownerDocument;
      await new vt(
        d,
        t.source,
        t.speed,
        t.makeTypos,
        u
      ).writeLikeAHuman(r.value, n.value);
    };
    return (d, l) => (bt(), kt("div", {
      ref_key: "root",
      ref: e,
      class: "code-snippet"
    }, [
      q("div", qt, [
        q("pre", {
          class: J(["to-place", n.value])
        }, [
          q("code", {
            class: J(h.value)
          }, null, 2)
        ], 2)
      ]),
      q("div", Bt, [
        q("pre", {
          class: J(["to-write", r.value])
        }, [
          q("code", {
            class: J(h.value)
          }, null, 2)
        ], 2)
      ])
    ], 512));
  }
}), Nt = { class: "to-be-written" }, Wt = xt({
  name: "TextWriter"
}), Gt = /* @__PURE__ */ Object.assign(Wt, {
  props: {
    source: {
      default: ""
    },
    speed: {
      default: "60"
    },
    dependsOnSelector: {
      default: ""
    },
    makeTypos: {
      default: !1
    },
    styles: {
      default: ""
    },
    classes: {
      default: ""
    },
    finished: {
      default: !1
    },
    restart: {
      default: !1
    }
  },
  setup(m) {
    const t = m, e = B(null), s = B(""), n = B(""), r = () => {
      let u = Date.now().toString();
      return u = u.substring(u.length - 4), u = btoa(u), u = u.replace(/=/g, ""), u;
    };
    s.value = r(), n.value = "paper-" + s.value, wt(async () => {
      const u = e.value.ownerDocument;
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((l) => {
        const g = u.createElement("style");
        g.innerHTML = `@import "${l}"`, u.head.appendChild(g);
      }), u.querySelector("." + n.value).setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const i = u.querySelector(t.dependsOnSelector);
        if (i !== null) {
          const d = { attributes: !0 };
          new MutationObserver(
            async (g, x) => {
              for (const k of g)
                k.type === "attributes" && k.attributeName === "finished" && i.getAttribute("finished") === "true" && (x.disconnect(), await c());
            }
          ).observe(i, d);
        }
      } else
        await c();
    });
    const h = function(u) {
      const i = new CustomEvent("finishedWriting", {
        bubbles: !0,
        cancellable: !0,
        detail: {
          content: u
        }
      });
      e.value.dispatchEvent(i), e.value.setAttribute("finished", "true");
    }, c = async () => {
      const u = e.value.ownerDocument;
      await new vt(
        u,
        t.source,
        t.speed,
        t.makeTypos,
        h
      ).writeLikeAHuman(n.value);
    };
    return (u, i) => (bt(), kt("div", {
      ref_key: "root",
      ref: e,
      class: "text-snippet"
    }, [
      q("div", Nt, [
        q("div", {
          class: J(["to-write", n.value])
        }, null, 2)
      ])
    ], 512));
  }
}), Rt = (m) => ({
  textSpeed: m.speed,
  textTypos: m.makeTypos
}), Ut = {
  install(m, t) {
    m.config.globalProperties.$writerOptions = Rt(t), m.component("text-writer", Gt), m.component("code-writer", Ft);
  }
};
export {
  Ft as CodeWriter,
  Gt as TextWriter,
  Ut as VueWriterPlugin
};

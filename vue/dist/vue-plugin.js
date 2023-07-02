var at = (x, t, e) => {
  if (!t.has(x))
    throw TypeError("Cannot " + e);
};
var p = (x, t, e) => (at(x, t, "read from private field"), e ? e.call(x) : t.get(x)), A = (x, t, e) => {
  if (t.has(x))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(x) : t.set(x, e);
}, _ = (x, t, e, n) => (at(x, t, "write to private field"), n ? n.call(x, e) : t.set(x, e), e);
var mt = (x, t, e) => (at(x, t, "access private method"), e);
import { defineComponent as xt, ref as W, onMounted as wt, openBlock as bt, createElementBlock as kt, createElementVNode as q, normalizeClass as dt } from "vue";
const ct = "&lt;", nt = "&gt;", ut = "/";
var J, G, S, R, z, K, X, P, Y, it, Tt;
class Dt {
  constructor(t, e = !1) {
    A(this, it);
    A(this, J, []);
    A(this, G, "");
    A(this, S, "");
    A(this, R, []);
    A(this, z, []);
    A(this, K, []);
    A(this, X, []);
    A(this, P, []);
    A(this, Y, []);
    _(this, G, t.trim()), _(this, S, `${p(this, G)}
<Eof />`), this.protect(), e && this.markupQuotes(), this.collectWords(p(this, S)), this.makeMistakes();
  }
  get list() {
    return p(this, J);
  }
  get text() {
    return p(this, G);
  }
  get workingText() {
    return p(this, S);
  }
  get words() {
    return p(this, R);
  }
  get mistakes() {
    return p(this, P);
  }
  get mistakeCursors() {
    return p(this, Y);
  }
  get phraseStarts() {
    return p(this, z);
  }
  get phraseLengths() {
    return p(this, K);
  }
  get wordEnds() {
    return p(this, X);
  }
  translateBracket(t, e, n = !1) {
    let i = t, o = !1;
    return "CDETQRG".includes(e) && (e === "C" && (i = n ? ")" : "(", o = !0), e === "D" && (i = n ? "}}" : "{{", o = !0), e === "E" && (i = n ? "}" : "{", o = !0), e === "T" && (i = n ? "]" : "[", o = !0), e === "Q" && (i = "'", o = !0), e === "R" && (i = '"', o = !0), e === "G" && (i = "`", o = !0)), { word: i, translated: o };
  }
  markupQuotes() {
    let t = p(this, S);
    const e = /(["'`])((\s|((\\)*)\\.|.)*?)\1/gm;
    let n;
    const i = [];
    for (; (n = e.exec(t)) !== null; )
      n.index === e.lastIndex && e.lastIndex++, i.push(n);
    for (let o = i.length - 1; o > -1; o--) {
      const d = i[o], a = d[1], u = d[0];
      let s = d[2];
      const h = d.index + 1, c = h + u.length - 1;
      let g = "";
      a === '"' ? g = "R" : a === "'" ? g = "Q" : a === "`" && (g = "G"), s = s.replace(/&lt;/g, "&pp;"), s = s.replace(/&gt;/g, "&pg;");
      const m = `&oq;${g}&cq;${s}&oq;/${g}&cq;`, v = t.substring(0, h - 1), f = t.substring(c);
      t = v + m + f;
    }
    _(this, S, t);
  }
  doAttributes(t) {
    const e = {}, n = /([\w]*)(\[\])?=("([\S ][^"]*)"|'([\S]*)'|\{\{ ([\w]*) \}\}|\{([\S ]*)\})/gm;
    let i;
    const o = [];
    for (; (i = n.exec(t)) !== null; )
      i.index === n.lastIndex && n.lastIndex++, o.push(i);
    for (let d = 0; d < o.length; d++) {
      const a = o[d], u = a[1], s = a[2], h = a[3].substring(0, 1), c = a[4];
      s === "[]" ? (e[u] === void 0 && (e[u] = []), e[u].push(h + c)) : e[u] = `${h}${c}`;
    }
    return e;
  }
  isClosedTag(t) {
    let e = !1;
    const { text: n } = t;
    return n === "" || (e = n.substring(n.length - 5, n.length) === ut + nt), e;
  }
  isCloserTag(t) {
    let e = !1;
    const { text: n } = t;
    return n === "" || (e = n.substring(0, 5) === ct + ut), e;
  }
  makeTag(t, e, n, i, o = !1) {
    const { text: d } = t, { name: a } = t, u = this.list.length, s = {};
    return s.id = t.id, s.name = a === "" ? "Fragment" : a, s.text = d, s.startsAt = t.startsAt, s.endsAt = t.endsAt, o || (s.uid = mt(this, it, Tt), s.method = "echo", s.props = s.name === "Fragment" ? [] : [], s.depth = n, s.hasCloser = i, s.node = !1, s.isSingle = !1), (e[n] === void 0 || e[n] === null) && (e[n] = u - 1), s.parentId = e[n], s;
  }
  protect() {
    let t = p(this, S);
    t = t.trim(), t = t.replace(/\{\{/g, "<D>"), t = t.replace(/\}\}/g, "</D>"), t = t.replace(/\(/g, "<C>"), t = t.replace(/\)/g, "</C>"), t = t.replace(/\{/g, "<E>"), t = t.replace(/\}/g, "</E>"), t = t.replace(/\[/g, "<T>"), t = t.replace(/\]/g, "</T>"), t = t.replace(/<([/\w])/g, `${ct}$1`), t = t.replace(/>/g, nt), _(this, S, t);
  }
  collectTags(t, e = "[\\w]+") {
    const n = [], i = [], o = `${ct}\\/?(${e})((\\s|.*?)*?)\\/?${nt}`, d = new RegExp(o, "gm");
    let a;
    for (; (a = d.exec(t)) !== null; )
      a.index === d.lastIndex && d.lastIndex++, i.push(a);
    let u = 0;
    return i.forEach((s) => {
      const h = s;
      h.id = u, h.text = s[0], h.name = s[1] === null ? "Fragment" : s[1], h.startsAt = s.index, h.endsAt = s.index + h.text.length - 1, delete h[0], delete h[1], delete h[2], delete h[3], n.push(h), u++;
    }), n;
  }
  collectWords(t) {
    const e = [], n = [];
    let i = /([&oqpg;]{4})[\w /]+([&cqpp;]{4})/gm, o;
    for (; (o = i.exec(t)) !== null; )
      o.index === i.lastIndex && i.lastIndex++, n.push(o);
    let d = t;
    for (let a = n.length - 1; a > -1; a--) {
      const u = n[a][0], s = n[a].index + 1, h = s + u.length - 1, c = "•".repeat(u.length), g = d.substring(0, s - 1), m = d.substring(h);
      d = g + c + m;
    }
    for (i = /([&lt;]{4})[\w /]+([&gt;]{4})/gm; (o = i.exec(d)) !== null; )
      o.index === i.lastIndex && i.lastIndex++, n.push(o);
    for (let a = n.length - 1; a > -1; a--) {
      const u = n[a][0], s = n[a].index + 1, h = s + u.length - 1, c = "•".repeat(u.length), g = d.substring(0, s - 1), m = d.substring(h);
      d = g + c + m;
    }
    for (i = /([&ltgt;]{4})/gm; (o = i.exec(d)) !== null; )
      o.index === i.lastIndex && i.lastIndex++, n.push(o);
    for (let a = n.length - 1; a > -1; a--) {
      const u = n[a][0], s = n[a].index + 1, h = s + u.length - 1, c = "•".repeat(u.length), g = d.substring(0, s - 1), m = d.substring(h);
      d = g + c + m;
    }
    for (i = /((?!•)\S[^•\n]*)/g; (o = i.exec(d)) !== null; )
      o.index === i.lastIndex && i.lastIndex++, p(this, z).push(o.index), p(this, K).push(o[0].length);
    for (i = /((?!•)\S[^•\n ]*)/g; (o = i.exec(d)) !== null; ) {
      o.index === i.lastIndex && i.lastIndex++;
      const a = {};
      a.text = o[0], a.startsAt = o.index, a.endsAt = a.startsAt + o[0].length - 1, e.push(a), p(this, X).push(a.endsAt);
    }
    _(this, R, e);
  }
  makeMistakes() {
    let t = Math.ceil(Math.random() * 2) - 2;
    const e = Math.ceil(Math.random() * 3) + 2;
    p(this, R).forEach((n) => {
      if (t++, t % e !== 0 || n.text.length < 4)
        return;
      const i = Math.ceil(Math.random() * n.text.length) - 1, o = String.fromCharCode(
        Math.ceil(Math.random() * 26) + 96
      );
      p(this, Y).push(n.startsAt + i), p(this, P).push(o);
    });
  }
  makeFaultyText() {
    let t = p(this, S);
    p(this, P).forEach((e) => {
      const n = t.substring(0, e.startsAt), i = t.substring(e.endsAt + 1);
      t = n + e.text + i;
    }), _(this, S, t);
  }
  splitTags(t) {
    let e = [...t], n = e.length, i = 0, o = !1, d = 0;
    const a = n;
    let u = !1;
    const s = [], h = [];
    for (; e.length > 0 && !o && !u; ) {
      if (i === n) {
        if (i = 0, e = Object.values(e), n = e.length, n === 0) {
          o = !0;
          continue;
        }
        d++, u = d > a + 1;
      }
      const c = e[i];
      if (e.length === 1 && c.name === "Eof") {
        o = !0;
        continue;
      }
      if (this.isClosedTag(c) && c.name !== "Eof") {
        h[i] = e[i], delete e[i], i++;
        continue;
      }
      if (i + 1 < n) {
        const g = e[i + 1];
        if (!this.isCloserTag(c) && this.isCloserTag(g)) {
          if (c.name !== g.name) {
            s.push(c), delete e[i], i++;
            continue;
          }
          h[i] = e[i], h[i + 1] = e[i + 1], delete e[i], delete e[i + 1], i += 2;
          continue;
        }
      }
      i++;
    }
    return { regularTags: h, singleTags: s };
  }
  replaceTags(t, e) {
    let n = t, i = e;
    const o = [];
    e.forEach((d) => {
      o[d.id] = d;
    }), o.sort(), i = Object.values(o);
    for (let d = i.length - 1; d > -1; d--) {
      const a = i[d];
      a.text = a.text.substring(0, a.text.length - 4) + ut + nt;
      const u = n.substring(0, a.startsAt), s = n.substring(a.endsAt + 1);
      n = u + a.text + s;
    }
    return n;
  }
  doComponents(t = "[\\w]+") {
    let e = p(this, S);
    const n = this.collectTags(e, t), i = [];
    let o = [], d = 0;
    const a = [];
    let u = n.length, s = 0, h = !1, c = 0;
    const g = u;
    let m = !1;
    a[d] = -1;
    const { singleTags: v } = this.splitTags(n);
    let f = n;
    for (v.length && (v.forEach((b) => i.push(b.id)), e = this.replaceTags(e, v), f = this.collectTags(e, t)); f.length > 0 && !h && !m; ) {
      if (s === u) {
        if (s = 0, f = Object.values(f), u = f.length, u === 0) {
          h = !0;
          continue;
        }
        c++, m = c > g + 1;
      }
      const b = f[s];
      if (f.length === 1 && b.name === "Eof") {
        h = !0;
        continue;
      }
      if (this.isClosedTag(b) && b.name !== "Eof") {
        const I = this.makeTag(b, a, d, !1);
        I.isSingle = i.includes(b.id), o[I.id] = I, delete f[s], s++;
        continue;
      }
      if (this.isCloserTag(b) && d--, s + 1 < u) {
        const I = f[s + 1];
        if (!this.isCloserTag(b) && this.isCloserTag(I)) {
          const M = this.makeTag(b, a, d, !0), C = this.makeTag(
            I,
            a,
            d,
            !1,
            !0
          );
          C.contents = {}, C.parentId = M.id, C.contents.startsAt = M.endsAt + 1, C.contents.endsAt = C.startsAt;
          const lt = e.substring(
            C.contents.startsAt,
            C.contents.endsAt
          );
          C.contents.text = lt, M.closer = C, o[M.id] = M, delete f[s], delete f[s + 1], s += 2;
          continue;
        }
        !this.isCloserTag(b) && !this.isCloserTag(I) && (d++, a[d] = b.id);
      }
      s++;
    }
    o = Object.values(o), _(this, S, e), _(this, J, o);
  }
}
J = new WeakMap(), G = new WeakMap(), S = new WeakMap(), R = new WeakMap(), z = new WeakMap(), K = new WeakMap(), X = new WeakMap(), P = new WeakMap(), Y = new WeakMap(), it = new WeakSet(), Tt = function() {
  return Date.now() * Math.random();
};
const $ = "&lt;", O = "&gt;", j = "<", F = ">", N = "/", D = `
`;
var Z, Q, tt, U, V;
class yt {
  constructor(t, e, n, i, o) {
    A(this, Z, "");
    A(this, Q, 60);
    A(this, tt, !1);
    A(this, U, () => {
    });
    A(this, V, () => {
    });
    _(this, U, t), _(this, Z, e), _(this, Q, n), _(this, V, o), _(this, tt, i);
  }
  async writeLikeAHuman(t, e) {
    const n = e !== void 0, i = p(this, U).querySelector(
      `pre.to-place.${e} code`
    ), o = p(this, U).querySelector(
      n ? `pre.to-place.${t} code` : `div.to-write.${t}`
    );
    let d = p(this, Q), a = [], u = "", s = "", h = "", c = null, g = [];
    const m = [];
    let v = "", f = "", b = -1;
    const I = [], M = [];
    let C = 0, lt = this;
    function ht(l) {
      return new Promise((r) => {
        setTimeout(r, l);
      });
    }
    function vt(l) {
      return Math.floor(l * 0.75 + Math.random() * l);
    }
    async function E(l, r = !1) {
      let T = a.join("");
      r && (T = T.trim()), d = vt(p(lt, Q)), u += l, o.innerHTML = u + T, n && window.hljs !== void 0 && window.hljs.highlightElement(o), await ht(d);
    }
    async function Et() {
      const l = a.join("");
      u = u.substring(0, u.length - 1), o.innerHTML = u + l, await ht(d);
    }
    function B(l) {
      a.unshift(l);
    }
    function et() {
      delete a[0], a = Object.values(a);
    }
    function At(l) {
      const r = [], T = /^([^\S][ \s]+)*/gm;
      let L;
      for (; (L = T.exec(l)) !== null; )
        L.index === T.lastIndex && T.lastIndex++, r.push(L[0] ?? "");
      return r;
    }
    function Ct(l) {
      const r = /^([^\S][ \s]+)*/gm;
      return l.replace(r, "");
    }
    function _t(l) {
      const r = l.split(`
`);
      return `<br />
`.repeat(r.length);
    }
    async function St(l) {
      let r = "";
      return await fetch(l).then((T) => T.text()).then((T) => {
        r = T;
      }), r;
    }
    function $t(l) {
      return l.replaceAll(
        $,
        j
      ).replaceAll(O, F);
    }
    function It() {
      let l = null;
      return g.length && (l = g.shift(), l.hasCloser && m.push(l)), l;
    }
    function Lt() {
      return m.length ? m[m.length - 1] : null;
    }
    function Ot() {
      if (!I.length)
        return null;
      const l = I.pop(), r = M.pop();
      B(r ? D + s + l : l);
    }
    function ft(l) {
      let r = null;
      if (!m.length || (r = Lt(), l === r.depth))
        return r;
      let T = !1;
      for (let L = m.length - 1; L > -1; L--)
        if (r = m[L], l === r.depth) {
          T = !0;
          break;
        }
      return T ? r : null;
    }
    const Mt = p(this, Z);
    v = await St(Mt);
    const gt = At(v);
    v = Ct(v);
    const k = new Dt(v, n);
    if (k.doComponents(), g = [...k.list], f = k.workingText.replace(
      `${D + $}Eof ${N}${O}`,
      ""
    ), n) {
      console.log({ sourceComponent: i });
      const l = _t(v + `
`);
      console.log({ emptyText: l }), i.innerHTML = l, window.hljs !== void 0 && window.hljs.highlightElement(i);
    }
    const jt = gt[C] ?? "";
    await E(jt), C++;
    for (let l = 0; l < f.length; l++) {
      let r = f[l];
      if (n && r === j) {
        r = $, await E(r);
        continue;
      }
      if (p(this, tt) && k.mistakes.length && k.phraseStarts.length && k.phraseStarts[0] === l) {
        const y = k.phraseLengths[0];
        for (let w = 0; w < y; w++) {
          const H = l + w, ot = k.mistakeCursors[0];
          if (r = f[H], ot === H ? await E(k.mistakes[0]) : await E(r), k.wordEnds.includes(H) && k.mistakeCursors.length) {
            const st = k.mistakeCursors[0];
            if (st <= H) {
              const rt = H - st + 1;
              for (let pt = 0; pt < rt; pt++)
                await Et(), w--;
              k.mistakes.shift(), k.mistakeCursors.shift();
            }
          }
        }
        k.phraseStarts.shift(), k.phraseLengths.shift(), l += y - 1;
        continue;
      }
      const T = f.substring(l, l + 4), L = f.substring(l, l + 5);
      if (r === "&" && L === "&oq;/") {
        const y = f.substring(l + 5, l + 6), { word: w } = k.translateBracket(r, y);
        et(), await E(w), l += 9;
        continue;
      }
      if (r === "&" && T === "&oq;") {
        const y = f.substring(l + 4, l + 5), { word: w } = k.translateBracket(r, y);
        B(w), await E(w), l += 8;
        continue;
      }
      if (r === "&" && T === "&pp;") {
        l += 3, await E($);
        continue;
      }
      if (r === "&" && T === "&pg;") {
        l += 3, await E(O);
        continue;
      }
      if (n) {
        if (r === "/" && L === N + O && c !== null && !c.hasCloser && c.endsAt === l + 4) {
          r = N + O, et(), await E(r), l += 4;
          continue;
        }
        if (r === "&" && T === O && c !== null && c.endsAt === l + 3) {
          et(), await E(O), c.hasCloser && Ot(), l += 3;
          continue;
        }
      }
      if (r === "&" && L === $ + N) {
        c = ft(b), c === null && b - 1 > -1 && (c = ft(b - 1)), r = c.closer.text, n || (r = j + N + c.closer.name + F);
        const { word: y } = k.translateBracket(
          r,
          c.name,
          !0
        );
        if (r = y, r !== "") {
          et(), l = c.closer.endsAt, await E(r), b--, c = null;
          continue;
        }
      }
      if (r === "&" && T !== $) {
        const y = f.substring(l).indexOf(";");
        if (y > 8) {
          await E(r);
          continue;
        }
        const w = f.substring(l, l + y + 1);
        await E(w), l += w.length - 1;
        continue;
      }
      if (r === "&" && T === $) {
        if ((c === null || c !== null && c.dirty) && (c = It()), c.startsAt !== l) {
          n ? (r = $, l += 3) : (r = c.text.replace($, j), r = r.replace(O, F)), await E(r), c.dirty = !1;
          continue;
        }
        c.dirty = !0;
        let y = !1, w = "";
        r = c.text, n || (r = c.text.replace($, j), r = r.replace(O, F));
        const { word: H, translated: ot } = k.translateBracket(
          r,
          c.name
        );
        if (r = H, c.hasCloser) {
          b++, w = c.closer.text, n || (w = j + N + c.closer.name + F);
          const { word: st, translated: rt } = k.translateBracket(
            w,
            c.name,
            !0
          );
          w = st, y = c.closer.contents.text.indexOf(D) > -1, rt ? (l = c.endsAt, B(y ? D + s + w : w)) : (I.push(w), M.push(y));
        }
        ot || (y = c.text.indexOf(D) > -1, n ? (r = $, l += 3, w = O) : (r = c.text.replace($, j), r = r.replace(O, F), l += c.text.length - 1, w = j + N + c.closer.name + F), B(y ? D + s + w : w)), await E(r);
        continue;
      }
      if (r === D) {
        s = gt[C] ?? "", h = D + s;
        const y = a.length ? a[0].trim() : "", w = f.substring(
          l + 1,
          l + y.length + 1
        );
        C++, await E(h, y === w);
        continue;
      }
      await E(r);
    }
    u = $t(u), this.finishedEvent(u);
  }
  finishedEvent(t) {
    typeof p(this, V) == "function" && p(this, V).call(this, t);
  }
}
Z = new WeakMap(), Q = new WeakMap(), tt = new WeakMap(), U = new WeakMap(), V = new WeakMap();
const qt = { class: "to-be-placed" }, Bt = /* @__PURE__ */ q("code", null, null, -1), Ht = [
  Bt
], Ft = { class: "to-be-written" }, Nt = /* @__PURE__ */ q("code", null, null, -1), Wt = [
  Nt
], Gt = xt({
  name: "CodeWriter"
}), Rt = /* @__PURE__ */ Object.assign(Gt, {
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
  setup(x) {
    const t = x, e = W(null), n = W(""), i = W(""), o = W(""), d = () => {
      let s = Date.now().toString();
      return s = s.substring(s.length - 4), s = btoa(s), s = s.replace(/=/g, ""), s;
    };
    n.value = d(), i.value = "to-place-" + n.value, o.value = "to-write-" + n.value, wt(async () => {
      const s = e.value.ownerDocument;
      if (t.useHighlightJs) {
        const h = t.theme ?? "base16/monokai", c = t.language ?? "html", g = s.createElement("script");
        g.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js", s.head.appendChild(g);
        const m = [];
        m.push(
          "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
        ), m.push(
          `https://highlightjs.org/static/demo/styles/${h}.css`
        ), m.forEach((f) => {
          const b = s.createElement("style");
          b.innerHTML = `@import "${f}"`, s.head.appendChild(b);
        });
        const v = s.querySelectorAll("code");
        for (const f of v)
          f.setAttribute("class", `language-${c}`);
      }
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((g) => {
        const m = s.createElement("style");
        m.innerHTML = `@import "${g}"`, s.head.appendChild(m);
      }), s.getElementById(o.value).setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const h = s.querySelector(t.dependsOnSelector);
        if (h !== null) {
          const c = { attributes: !0 };
          new MutationObserver(
            async (m, v) => {
              for (const f of m)
                f.type === "attributes" && f.attributeName === "finished" && h.getAttribute("finished") === "true" && (v.disconnect(), await u());
            }
          ).observe(h, c);
        }
      } else
        await u();
    });
    const a = function(s) {
      const h = new CustomEvent("finishedWriting", {
        bubbles: !0,
        cancellable: !0,
        detail: {
          content: s
        }
      });
      e.value.dispatchEvent(h), e.value.setAttribute("finished", "true");
    }, u = async () => {
      const s = e.value.ownerDocument;
      await new yt(
        s,
        t.source,
        t.speed,
        t.makeTypos,
        a
      ).writeLikeAHuman(o.value, i.value);
    };
    return (s, h) => (bt(), kt("div", {
      ref_key: "root",
      ref: e,
      class: "code-snippet"
    }, [
      q("div", qt, [
        q("pre", {
          class: dt(["to-place", i.value])
        }, Ht, 2)
      ]),
      q("div", Ft, [
        q("pre", {
          class: dt(["to-write", o.value])
        }, Wt, 2)
      ])
    ], 512));
  }
}), Pt = { class: "to-be-written" }, Qt = xt({
  name: "TextWriter"
}), Ut = /* @__PURE__ */ Object.assign(Qt, {
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
  setup(x) {
    const t = x, e = W(null), n = W(""), i = W(""), o = () => {
      let u = Date.now().toString();
      return u = u.substring(u.length - 4), u = btoa(u), u = u.replace(/=/g, ""), u;
    };
    n.value = o(), i.value = "paper-" + n.value, wt(async () => {
      const u = e.value.ownerDocument;
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((c) => {
        const g = u.createElement("style");
        g.innerHTML = `@import "${c}"`, u.head.appendChild(g);
      }), u.querySelector("." + i.value).setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
        const s = u.querySelector(t.dependsOnSelector);
        if (s !== null) {
          const h = { attributes: !0 };
          new MutationObserver(
            async (g, m) => {
              for (const v of g)
                v.type === "attributes" && v.attributeName === "finished" && s.getAttribute("finished") === "true" && (m.disconnect(), await a());
            }
          ).observe(s, h);
        }
      } else
        await a();
    });
    const d = function(u) {
      const s = new CustomEvent("finishedWriting", {
        bubbles: !0,
        cancellable: !0,
        detail: {
          content: u
        }
      });
      e.value.dispatchEvent(s), e.value.setAttribute("finished", "true");
    }, a = async () => {
      const u = e.value.ownerDocument;
      await new yt(
        u,
        t.source,
        t.speed,
        t.makeTypos,
        d
      ).writeLikeAHuman(i.value);
    };
    return (u, s) => (bt(), kt("div", {
      ref_key: "root",
      ref: e,
      class: "text-snippet"
    }, [
      q("div", Pt, [
        q("div", {
          class: dt(["to-write", i.value])
        }, null, 2)
      ])
    ], 512));
  }
}), Vt = (x) => ({
  textSpeed: x.speed,
  textTypos: x.makeTypos
}), Kt = {
  install(x, t) {
    x.config.globalProperties.$writerOptions = Vt(t), x.component("text-writer", Ut), x.component("code-writer", Rt);
  }
};
export {
  Rt as CodeWriter,
  Ut as TextWriter,
  Kt as VueWriterPlugin
};

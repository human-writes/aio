var at = (x, t, e) => {
  if (!t.has(x))
    throw TypeError("Cannot " + e);
};
var p = (x, t, e) => (at(x, t, "read from private field"), e ? e.call(x) : t.get(x)), A = (x, t, e) => {
  if (t.has(x))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(x) : t.set(x, e);
}, _ = (x, t, e, n) => (at(x, t, "write to private field"), n ? n.call(x, e) : t.set(x, e), e);
var pt = (x, t, e) => (at(x, t, "access private method"), e);
import { defineComponent as mt, ref as W, onMounted as xt, openBlock as wt, createElementBlock as bt, createElementVNode as B } from "vue";
const ct = "&lt;", nt = "&gt;", ut = "/";
var J, G, $, R, z, K, X, P, Y, it, kt;
class jt {
  constructor(t, e = !1) {
    A(this, it);
    A(this, J, []);
    A(this, G, "");
    A(this, $, "");
    A(this, R, []);
    A(this, z, []);
    A(this, K, []);
    A(this, X, []);
    A(this, P, []);
    A(this, Y, []);
    _(this, G, t.trim()), _(this, $, `${p(this, G)}
<Eof />`), this.protect(), e && this.markupQuotes(), this.collectWords(p(this, $)), this.makeMistakes();
  }
  get list() {
    return p(this, J);
  }
  get text() {
    return p(this, G);
  }
  get workingText() {
    return p(this, $);
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
    let i = t, r = !1;
    return "CDETQRG".includes(e) && (e === "C" && (i = n ? ")" : "(", r = !0), e === "D" && (i = n ? "}}" : "{{", r = !0), e === "E" && (i = n ? "}" : "{", r = !0), e === "T" && (i = n ? "]" : "[", r = !0), e === "Q" && (i = "'", r = !0), e === "R" && (i = '"', r = !0), e === "G" && (i = "`", r = !0)), { word: i, translated: r };
  }
  markupQuotes() {
    let t = p(this, $);
    const e = /(["'`])((\s|((\\)*)\\.|.)*?)\1/gm;
    let n;
    const i = [];
    for (; (n = e.exec(t)) !== null; )
      n.index === e.lastIndex && e.lastIndex++, i.push(n);
    for (let r = i.length - 1; r > -1; r--) {
      const d = i[r], a = d[1], u = d[0];
      let s = d[2];
      const h = d.index + 1, c = h + u.length - 1;
      let g = "";
      a === '"' ? g = "R" : a === "'" ? g = "Q" : a === "`" && (g = "G"), s = s.replace(/&lt;/g, "&pp;"), s = s.replace(/&gt;/g, "&pg;");
      const m = `&oq;${g}&cq;${s}&oq;/${g}&cq;`, v = t.substring(0, h - 1), f = t.substring(c);
      t = v + m + f;
    }
    _(this, $, t);
  }
  doAttributes(t) {
    const e = {}, n = /([\w]*)(\[\])?=("([\S ][^"]*)"|'([\S]*)'|\{\{ ([\w]*) \}\}|\{([\S ]*)\})/gm;
    let i;
    const r = [];
    for (; (i = n.exec(t)) !== null; )
      i.index === n.lastIndex && n.lastIndex++, r.push(i);
    for (let d = 0; d < r.length; d++) {
      const a = r[d], u = a[1], s = a[2], h = a[3].substring(0, 1), c = a[4];
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
  makeTag(t, e, n, i, r = !1) {
    const { text: d } = t, { name: a } = t, u = this.list.length, s = {};
    return s.id = t.id, s.name = a === "" ? "Fragment" : a, s.text = d, s.startsAt = t.startsAt, s.endsAt = t.endsAt, r || (s.uid = pt(this, it, kt), s.method = "echo", s.props = s.name === "Fragment" ? [] : [], s.depth = n, s.hasCloser = i, s.node = !1, s.isSingle = !1), (e[n] === void 0 || e[n] === null) && (e[n] = u - 1), s.parentId = e[n], s;
  }
  protect() {
    let t = p(this, $);
    t = t.trim(), t = t.replace(/\{\{/g, "<D>"), t = t.replace(/\}\}/g, "</D>"), t = t.replace(/\(/g, "<C>"), t = t.replace(/\)/g, "</C>"), t = t.replace(/\{/g, "<E>"), t = t.replace(/\}/g, "</E>"), t = t.replace(/\[/g, "<T>"), t = t.replace(/\]/g, "</T>"), t = t.replace(/<([/\w])/g, `${ct}$1`), t = t.replace(/>/g, nt), _(this, $, t);
  }
  collectTags(t, e = "[\\w]+") {
    const n = [], i = [], r = `${ct}\\/?(${e})((\\s|.*?)*?)\\/?${nt}`, d = new RegExp(r, "gm");
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
    let i = /([&oqpg;]{4})[\w /]+([&cqpp;]{4})/gm, r;
    for (; (r = i.exec(t)) !== null; )
      r.index === i.lastIndex && i.lastIndex++, n.push(r);
    let d = t;
    for (let a = n.length - 1; a > -1; a--) {
      const u = n[a][0], s = n[a].index + 1, h = s + u.length - 1, c = "•".repeat(u.length), g = d.substring(0, s - 1), m = d.substring(h);
      d = g + c + m;
    }
    for (i = /([&lt;]{4})[\w /]+([&gt;]{4})/gm; (r = i.exec(d)) !== null; )
      r.index === i.lastIndex && i.lastIndex++, n.push(r);
    for (let a = n.length - 1; a > -1; a--) {
      const u = n[a][0], s = n[a].index + 1, h = s + u.length - 1, c = "•".repeat(u.length), g = d.substring(0, s - 1), m = d.substring(h);
      d = g + c + m;
    }
    for (i = /([&ltgt;]{4})/gm; (r = i.exec(d)) !== null; )
      r.index === i.lastIndex && i.lastIndex++, n.push(r);
    for (let a = n.length - 1; a > -1; a--) {
      const u = n[a][0], s = n[a].index + 1, h = s + u.length - 1, c = "•".repeat(u.length), g = d.substring(0, s - 1), m = d.substring(h);
      d = g + c + m;
    }
    for (i = /((?!•)\S[^•\n]*)/g; (r = i.exec(d)) !== null; )
      r.index === i.lastIndex && i.lastIndex++, p(this, z).push(r.index), p(this, K).push(r[0].length);
    for (i = /((?!•)\S[^•\n ]*)/g; (r = i.exec(d)) !== null; ) {
      r.index === i.lastIndex && i.lastIndex++;
      const a = {};
      a.text = r[0], a.startsAt = r.index, a.endsAt = a.startsAt + r[0].length - 1, e.push(a), p(this, X).push(a.endsAt);
    }
    _(this, R, e);
  }
  makeMistakes() {
    let t = Math.ceil(Math.random() * 2) - 2;
    const e = Math.ceil(Math.random() * 3) + 2;
    p(this, R).forEach((n) => {
      if (t++, t % e !== 0 || n.text.length < 4)
        return;
      const i = Math.ceil(Math.random() * n.text.length) - 1, r = String.fromCharCode(
        Math.ceil(Math.random() * 26) + 96
      );
      p(this, Y).push(n.startsAt + i), p(this, P).push(r);
    });
  }
  makeFaultyText() {
    let t = p(this, $);
    p(this, P).forEach((e) => {
      const n = t.substring(0, e.startsAt), i = t.substring(e.endsAt + 1);
      t = n + e.text + i;
    }), _(this, $, t);
  }
  splitTags(t) {
    let e = [...t], n = e.length, i = 0, r = !1, d = 0;
    const a = n;
    let u = !1;
    const s = [], h = [];
    for (; e.length > 0 && !r && !u; ) {
      if (i === n) {
        if (i = 0, e = Object.values(e), n = e.length, n === 0) {
          r = !0;
          continue;
        }
        d++, u = d > a + 1;
      }
      const c = e[i];
      if (e.length === 1 && c.name === "Eof") {
        r = !0;
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
    const r = [];
    e.forEach((d) => {
      r[d.id] = d;
    }), r.sort(), i = Object.values(r);
    for (let d = i.length - 1; d > -1; d--) {
      const a = i[d];
      a.text = a.text.substring(0, a.text.length - 4) + ut + nt;
      const u = n.substring(0, a.startsAt), s = n.substring(a.endsAt + 1);
      n = u + a.text + s;
    }
    return n;
  }
  doComponents(t = "[\\w]+") {
    let e = p(this, $);
    const n = this.collectTags(e, t), i = [];
    let r = [], d = 0;
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
        I.isSingle = i.includes(b.id), r[I.id] = I, delete f[s], s++;
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
          C.contents.text = lt, M.closer = C, r[M.id] = M, delete f[s], delete f[s + 1], s += 2;
          continue;
        }
        !this.isCloserTag(b) && !this.isCloserTag(I) && (d++, a[d] = b.id);
      }
      s++;
    }
    r = Object.values(r), _(this, $, e), _(this, J, r);
  }
}
J = new WeakMap(), G = new WeakMap(), $ = new WeakMap(), R = new WeakMap(), z = new WeakMap(), K = new WeakMap(), X = new WeakMap(), P = new WeakMap(), Y = new WeakMap(), it = new WeakSet(), kt = function() {
  return Date.now() * Math.random();
};
const S = "&lt;", O = "&gt;", j = "<", F = ">", N = "/", D = `
`;
var Z, Q, tt, U, V;
class Tt {
  constructor(t, e, n, i, r) {
    A(this, Z, "");
    A(this, Q, 60);
    A(this, tt, !1);
    A(this, U, () => {
    });
    A(this, V, () => {
    });
    _(this, U, t), _(this, Z, e), _(this, Q, n), _(this, V, r), _(this, tt, i);
  }
  async writeLikeAHuman(t, e) {
    const n = e !== void 0, i = p(this, U).querySelector(
      `pre#${e} code`
    ), r = p(this, U).querySelector(
      n ? `pre#${t} code` : `div#${t}`
    );
    let d = p(this, Q), a = [], u = "", s = "", h = "", c = null, g = [];
    const m = [];
    let v = "", f = "", b = -1;
    const I = [], M = [];
    let C = 0, lt = this;
    function dt(l) {
      return new Promise((o) => {
        setTimeout(o, l);
      });
    }
    function yt(l) {
      return Math.floor(l * 0.75 + Math.random() * l);
    }
    async function E(l, o = !1) {
      let T = a.join("");
      o && (T = T.trim()), d = yt(p(lt, Q)), u += l, r.innerHTML = u + T, n && window.hljs !== void 0 && window.hljs.highlightElement(r), await dt(d);
    }
    async function vt() {
      const l = a.join("");
      u = u.substring(0, u.length - 1), r.innerHTML = u + l, await dt(d);
    }
    function q(l) {
      a.unshift(l);
    }
    function et() {
      delete a[0], a = Object.values(a);
    }
    function Et(l) {
      const o = [], T = /^([^\S][ \s]+)*/gm;
      let L;
      for (; (L = T.exec(l)) !== null; )
        L.index === T.lastIndex && T.lastIndex++, o.push(L[0] ?? "");
      return o;
    }
    function At(l) {
      const o = /^([^\S][ \s]+)*/gm;
      return l.replace(o, "");
    }
    function Ct(l) {
      const o = l.split(`
`);
      return `<br />
`.repeat(o.length);
    }
    async function _t(l) {
      let o = "";
      return await fetch(l).then((T) => T.text()).then((T) => {
        o = T;
      }), o;
    }
    function $t(l) {
      return l.replaceAll(
        S,
        j
      ).replaceAll(O, F);
    }
    function St() {
      let l = null;
      return g.length && (l = g.shift(), l.hasCloser && m.push(l)), l;
    }
    function It() {
      return m.length ? m[m.length - 1] : null;
    }
    function Lt() {
      if (!I.length)
        return null;
      const l = I.pop(), o = M.pop();
      q(o ? D + s + l : l);
    }
    function ht(l) {
      let o = null;
      if (!m.length || (o = It(), l === o.depth))
        return o;
      let T = !1;
      for (let L = m.length - 1; L > -1; L--)
        if (o = m[L], l === o.depth) {
          T = !0;
          break;
        }
      return T ? o : null;
    }
    const Ot = p(this, Z);
    v = await _t(Ot);
    const ft = Et(v);
    v = At(v);
    const k = new jt(v, n);
    if (k.doComponents(), g = [...k.list], f = k.workingText.replace(
      `${D + S}Eof ${N}${O}`,
      ""
    ), n) {
      console.log({ sourceComponent: i });
      const l = Ct(v + `
`);
      console.log({ emptyText: l }), i.innerHTML = l, window.hljs !== void 0 && window.hljs.highlightElement(i);
    }
    const Mt = ft[C] ?? "";
    await E(Mt), C++;
    for (let l = 0; l < f.length; l++) {
      let o = f[l];
      if (n && o === j) {
        o = S, await E(o);
        continue;
      }
      if (p(this, tt) && k.mistakes.length && k.phraseStarts.length && k.phraseStarts[0] === l) {
        const y = k.phraseLengths[0];
        for (let w = 0; w < y; w++) {
          const H = l + w, ot = k.mistakeCursors[0];
          if (o = f[H], ot === H ? await E(k.mistakes[0]) : await E(o), k.wordEnds.includes(H) && k.mistakeCursors.length) {
            const st = k.mistakeCursors[0];
            if (st <= H) {
              const rt = H - st + 1;
              for (let gt = 0; gt < rt; gt++)
                await vt(), w--;
              k.mistakes.shift(), k.mistakeCursors.shift();
            }
          }
        }
        k.phraseStarts.shift(), k.phraseLengths.shift(), l += y - 1;
        continue;
      }
      const T = f.substring(l, l + 4), L = f.substring(l, l + 5);
      if (o === "&" && L === "&oq;/") {
        const y = f.substring(l + 5, l + 6), { word: w } = k.translateBracket(o, y);
        et(), await E(w), l += 9;
        continue;
      }
      if (o === "&" && T === "&oq;") {
        const y = f.substring(l + 4, l + 5), { word: w } = k.translateBracket(o, y);
        q(w), await E(w), l += 8;
        continue;
      }
      if (o === "&" && T === "&pp;") {
        l += 3, await E(S);
        continue;
      }
      if (o === "&" && T === "&pg;") {
        l += 3, await E(O);
        continue;
      }
      if (n) {
        if (o === "/" && L === N + O && c !== null && !c.hasCloser && c.endsAt === l + 4) {
          o = N + O, et(), await E(o), l += 4;
          continue;
        }
        if (o === "&" && T === O && c !== null && c.endsAt === l + 3) {
          et(), await E(O), c.hasCloser && Lt(), l += 3;
          continue;
        }
      }
      if (o === "&" && L === S + N) {
        c = ht(b), c === null && b - 1 > -1 && (c = ht(b - 1)), o = c.closer.text, n || (o = j + N + c.closer.name + F);
        const { word: y } = k.translateBracket(
          o,
          c.name,
          !0
        );
        if (o = y, o !== "") {
          et(), l = c.closer.endsAt, await E(o), b--, c = null;
          continue;
        }
      }
      if (o === "&" && T !== S) {
        const y = f.substring(l).indexOf(";");
        if (y > 8) {
          await E(o);
          continue;
        }
        const w = f.substring(l, l + y + 1);
        await E(w), l += w.length - 1;
        continue;
      }
      if (o === "&" && T === S) {
        if ((c === null || c !== null && c.dirty) && (c = St()), c.startsAt !== l) {
          n ? (o = S, l += 3) : (o = c.text.replace(S, j), o = o.replace(O, F)), await E(o), c.dirty = !1;
          continue;
        }
        c.dirty = !0;
        let y = !1, w = "";
        o = c.text, n || (o = c.text.replace(S, j), o = o.replace(O, F));
        const { word: H, translated: ot } = k.translateBracket(
          o,
          c.name
        );
        if (o = H, c.hasCloser) {
          b++, w = c.closer.text, n || (w = j + N + c.closer.name + F);
          const { word: st, translated: rt } = k.translateBracket(
            w,
            c.name,
            !0
          );
          w = st, y = c.closer.contents.text.indexOf(D) > -1, rt ? (l = c.endsAt, q(y ? D + s + w : w)) : (I.push(w), M.push(y));
        }
        ot || (y = c.text.indexOf(D) > -1, n ? (o = S, l += 3, w = O) : (o = c.text.replace(S, j), o = o.replace(O, F), l += c.text.length - 1, w = j + N + c.closer.name + F), q(y ? D + s + w : w)), await E(o);
        continue;
      }
      if (o === D) {
        s = ft[C] ?? "", h = D + s;
        const y = a.length ? a[0].trim() : "", w = f.substring(
          l + 1,
          l + y.length + 1
        );
        C++, await E(h, y === w);
        continue;
      }
      await E(o);
    }
    u = $t(u), this.finishedEvent(u);
  }
  finishedEvent(t) {
    typeof p(this, V) == "function" && p(this, V).call(this, t);
  }
}
Z = new WeakMap(), Q = new WeakMap(), tt = new WeakMap(), U = new WeakMap(), V = new WeakMap();
const Dt = { class: "to-be-copied" }, Bt = ["id"], qt = /* @__PURE__ */ B("code", null, null, -1), Ht = [
  qt
], Ft = { class: "to-be-written" }, Nt = ["id"], Wt = /* @__PURE__ */ B("code", null, null, -1), Gt = [
  Wt
], Rt = mt({
  name: "CodeWriter"
}), Pt = /* @__PURE__ */ Object.assign(Rt, {
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
    const t = x, e = W(null), n = W(""), i = W(""), r = W(""), d = () => {
      let s = Date.now().toString();
      return s = s.substring(s.length - 4), s = btoa(s), s = s.replace(/=/g, ""), s;
    };
    n.value = d(), i.value = "to-copy-" + n.value, r.value = "to-write-" + n.value, xt(async () => {
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
      }), s.getElementById("to-write").setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
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
      await new Tt(
        s,
        t.source,
        t.speed,
        t.makeTypos,
        a
      ).writeLikeAHuman(r, i);
    };
    return (s, h) => (wt(), bt("div", {
      ref_key: "root",
      ref: e,
      class: "code-snippet"
    }, [
      B("div", Dt, [
        B("pre", {
          class: "placeholder",
          id: i.value.value
        }, Ht, 8, Bt)
      ]),
      B("div", Ft, [
        B("pre", {
          class: "to-write",
          id: r.value.value
        }, Gt, 8, Nt)
      ])
    ], 512));
  }
}), Qt = { class: "to-be-written" }, Ut = ["id"], Vt = mt({
  name: "TextWriter"
}), Jt = /* @__PURE__ */ Object.assign(Vt, {
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
    const t = x, e = W(null), n = W(""), i = W(""), r = () => {
      let u = Date.now().toString();
      return u = u.substring(u.length - 4), u = btoa(u), u = u.replace(/=/g, ""), u;
    };
    n.value = r(), i.value = "to-write-" + n.value, xt(async () => {
      const u = e.value.ownerDocument;
      if (t.styles !== "" && t.classes !== "" && (t.styles.split(",").forEach((c) => {
        const g = u.createElement("style");
        g.innerHTML = `@import "${c}"`, u.head.appendChild(g);
      }), u.getElementById("to-write").setAttribute("class", t.classes)), t.dependsOnSelector !== "") {
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
      await new Tt(
        u,
        t.source,
        t.speed,
        t.makeTypos,
        d
      ).writeLikeAHuman(i);
    };
    return (u, s) => (wt(), bt("div", {
      ref_key: "root",
      ref: e,
      class: "text-snippet"
    }, [
      B("div", Qt, [
        B("div", {
          class: "to-write",
          id: i.value.value
        }, null, 8, Ut)
      ])
    ], 512));
  }
}), zt = (x) => ({
  textSpeed: x.speed,
  textTypos: x.makeTypos
}), Yt = {
  install(x, t) {
    x.config.globalProperties.$writerOptions = zt(t), x.component("text-writer", Jt), x.component("code-writer", Pt);
  }
};
export {
  Pt as CodeWriter,
  Jt as TextWriter,
  Yt as VueWriterPlugin
};

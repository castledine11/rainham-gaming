/* Original vector illustrations. Each station is an interpretation of the console. */
window.consoleArt = function (kind, suffix = 'main') {
  const g = 'shell-' + suffix;
  const dark = 'dark-' + suffix;
  const purple = 'purple-' + suffix;
  const shapes = {
    snes: `<ellipse cx="210" cy="155" rx="166" ry="12" fill="#000" opacity=".22"/>
      <path d="M64 48h278l34 71-10 31H54l-11-31Z" fill="url(#${g})" stroke="#555d65"/>
      <path d="M43 119h333l-10 31H54Z" fill="#858d96"/><path d="M69 48h273l22 55H55Z" fill="#bfc5cc"/>
      <path d="M120 49h178l10 52H109Z" fill="#9da5af"/><path d="M133 52h150l6 12H128Z" fill="#30383d"/>
      <path d="M141 53h136" stroke="#070d10" stroke-width="5" stroke-linecap="round"/>
      <rect x="69" y="86" width="29" height="14" rx="3" fill="#796691"/><rect x="317" y="86" width="29" height="14" rx="3" fill="#796691"/>
      <path d="M171 93h73v15h-73Z" fill="#d4d8dd"/>
      <g fill="#384149"><rect x="76" y="125" width="52" height="15" rx="6"/><rect x="143" y="125" width="52" height="15" rx="6"/></g>
      <circle cx="335" cy="132" r="3" fill="#adf592"/><text x="263" y="133" font-size="9" fill="#47515e" font-family="Arial,sans-serif" font-weight="700">SUPER NINTENDO</text>`,
    n64: `<ellipse cx="210" cy="151" rx="155" ry="13" fill="#000" opacity=".25"/>
      <path d="M81 53q129-40 258 0l33 69-13 27H62l-13-27Z" fill="url(#${dark})" stroke="#151d22"/>
      <path d="M95 52q115-29 230 0l17 55H78Z" fill="#414b52"/><path d="M142 49q69-9 136 0l-1 17H143Z" fill="#111b20"/>
      <path d="M150 54h120" stroke="#070e12" stroke-width="6" stroke-linecap="round"/>
      <rect x="99" y="89" width="25" height="11" rx="3" fill="#65727b"/><rect x="295" y="89" width="25" height="11" rx="3" fill="#65727b"/>
      <path d="M166 81h86v27h-86Z" fill="#303940"/><text x="208" y="97" text-anchor="middle" fill="#cdd6da" font-size="9" font-family="Arial,sans-serif">NINTENDO 64</text>
      <g fill="#10171b" stroke="#636c72"><circle cx="115" cy="128" r="12"/><circle cx="176" cy="128" r="12"/><circle cx="237" cy="128" r="12"/><circle cx="298" cy="128" r="12"/></g><circle cx="78" cy="129" r="3" fill="#b0f48f"/>`,
    ps1: `<ellipse cx="210" cy="155" rx="157" ry="11" fill="#000" opacity=".23"/>
      <path d="M81 42h258l31 76-10 32H60l-10-32Z" fill="url(#${g})" stroke="#69757e"/>
      <path d="M81 42h258l23 62H58Z" fill="#c8cdd2"/>
      <g class="lid"><ellipse cx="210" cy="76" rx="82" ry="30" fill="#a8b0b9" stroke="#86929c"/><ellipse cx="210" cy="74" rx="74" ry="26" fill="#c3c9cf"/><text x="210" y="78" text-anchor="middle" font-size="12" font-family="Arial,sans-serif" fill="#5c6671" font-weight="700">PlayStation</text></g>
      <ellipse cx="93" cy="87" rx="14" ry="8" fill="#8f9aa4"/><ellipse cx="327" cy="87" rx="14" ry="8" fill="#8f9aa4"/>
      <g stroke="#e3e7e9" stroke-width="2"><path d="M70 55h35m-38 7h40m-42 7h44m206-14h35m-37 7h40m-42 7h44"/></g>
      <g fill="#525d68"><rect x="80" y="119" width="87" height="11" rx="2"/><rect x="185" y="119" width="87" height="11" rx="2"/><rect x="90" y="134" width="65" height="10" rx="5"/><rect x="196" y="134" width="65" height="10" rx="5"/></g><circle cx="330" cy="133" r="3" fill="#a2ee83"/>`,
    ps2: `<ellipse cx="210" cy="153" rx="165" ry="11" fill="#000" opacity=".25"/>
      <path d="M67 49h284l20 62H48Z" fill="#3b4750"/><path d="M48 111h323v37H48Z" fill="url(#${dark})"/>
      <path d="M65 55h275l12 42H54Z" fill="#202a34"/><path d="M70 58h4m4 0h4m4 0h4" stroke="#5c6c78"/>
      <text x="257" y="81" fill="#7ba5ce" font-size="24" font-family="Arial,sans-serif" letter-spacing="3">PS2</text>
      <g fill="#0d171f"><rect x="66" y="116" width="49" height="10"/><rect x="124" y="116" width="49" height="10"/><rect x="66" y="131" width="49" height="10"/><rect x="124" y="131" width="49" height="10"/></g>
      <g class="tray"><rect x="193" y="117" width="142" height="15" rx="2" fill="#101a22"/><path d="M198 121h132" stroke="#4a5864"/></g>
      <circle cx="354" cy="119" r="3" fill="#a5ef88"/><circle cx="354" cy="134" r="3" fill="#b3a3f2"/>`,
    gc: `<ellipse cx="210" cy="157" rx="105" ry="12" fill="#000" opacity=".25"/>
      <path d="M119 42h182l23 55-4 59H100l-4-59Z" fill="url(#${purple})" stroke="#514569"/>
      <path d="M119 42h182l18 48H101Z" fill="#9382b6"/>
      <g class="lid"><ellipse cx="210" cy="66" rx="64" ry="22" fill="#292c35" stroke="#c0afd9"/><text x="210" y="69" text-anchor="middle" fill="#d6c8eb" font-size="9" font-family="Arial,sans-serif" letter-spacing="1">NINTENDO GAMECUBE</text></g>
      <ellipse cx="125" cy="81" rx="10" ry="5" fill="#c6bdd8"/><ellipse cx="297" cy="81" rx="10" ry="5" fill="#c6bdd8"/>
      <g fill="#161e25" stroke="#aaa0c2"><circle cx="132" cy="116" r="12"/><circle cx="183" cy="116" r="12"/><circle cx="234" cy="116" r="12"/><circle cx="285" cy="116" r="12"/></g>
      <path d="M116 139h78m30 0h78" stroke="#3d3653" stroke-width="8"/><circle cx="211" cy="96" r="3" fill="#b7f58c"/>`,
    wii: `<ellipse cx="213" cy="159" rx="105" ry="11" fill="#000" opacity=".2"/>
      <path d="M145 15h116l24 132H167Z" fill="#f4f5f0" stroke="#8b9b9d"/><path d="M261 15l31 12 18 117-25 3Z" fill="#a8b9bb"/>
      <path d="M145 15h116l31 12H150Z" fill="#dce3e1"/>
      <path d="M242 39l13 77" stroke="#33434b" stroke-width="5" stroke-linecap="round"/><path d="M239 39l13 77" stroke="#a2bdfa" stroke-width="2"/>
      <circle cx="165" cy="36" r="4" fill="#bed4cf"/><circle cx="166" cy="36" r="1.5" fill="#83bd7d"/>
      <text x="182" y="118" font-family="Arial,sans-serif" font-size="20" fill="#809293">Wii</text>
      <path d="M147 146h153l20 14H130Z" fill="#c6d3d2"/>`,
    ps4: `<ellipse cx="210" cy="155" rx="164" ry="11" fill="#000" opacity=".25"/>
      <path d="M72 57h277l21 41H51Z" fill="#35404a"/><path d="M51 98h319l-15 23H39Z" fill="#1d2932"/>
      <path d="M57 107h305l-11 37H45Z" fill="#303d46"/><path d="M45 144h306l8 9H49Z" fill="#14232c"/>
      <path d="M234 57 228 99l-2 22-5 23" fill="none" stroke="#a69ce9" stroke-width="2"/>
      <path d="M66 123h135" stroke="#090f16" stroke-width="4" stroke-linecap="round"/><text x="270" y="132" font-size="13" fill="#aebdc7" font-family="Arial,sans-serif">PS4</text><circle cx="334" cy="132" r="2" fill="#cbddf4"/>`,
    switch: `<ellipse cx="210" cy="158" rx="141" ry="11" fill="#000" opacity=".25"/>
      <rect x="96" y="29" width="228" height="112" rx="16" fill="#222e35" stroke="#495d62"/><rect x="123" y="37" width="174" height="96" rx="4" fill="#0d1d23"/>
      <path d="M111 29h15v112h-15q-15 0-15-15V44q0-15 15-15Z" fill="#9e8bc5"/><path d="M296 29h13q15 0 15 15v82q0 15-15 15h-13Z" fill="#9bcbb3"/>
      <circle cx="111" cy="56" r="8" fill="#3c3b52"/><path d="M111 79v19m-9-10h18" stroke="#4c4662" stroke-width="4"/>
      <circle cx="310" cy="89" r="8" fill="#35554d"/><g fill="#3d6055"><circle cx="310" cy="49" r="3"/><circle cx="310" cy="65" r="3"/><circle cx="302" cy="57" r="3"/><circle cx="318" cy="57" r="3"/></g>
      <path d="M197 29h29" stroke="#7c8c8e" stroke-width="3"/>
      <rect x="132" y="77" width="156" height="78" rx="9" fill="#35484b" stroke="#566b69"/><text x="210" y="119" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#b5c8c2" letter-spacing="2">SWITCH</text><circle cx="147" cy="142" r="2" fill="#b9ed92"/>`
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 180" aria-hidden="true" focusable="false"><defs><linearGradient id="${g}" x2="0" y2="1"><stop stop-color="#d4d9dc"/><stop offset="1" stop-color="#8e99a1"/></linearGradient><linearGradient id="${dark}" x2="0" y2="1"><stop stop-color="#4d5c65"/><stop offset="1" stop-color="#202e36"/></linearGradient><linearGradient id="${purple}" x2="0" y2="1"><stop stop-color="#ad9acb"/><stop offset="1" stop-color="#665780"/></linearGradient></defs>${shapes[kind] || shapes.snes}</svg>`;
};

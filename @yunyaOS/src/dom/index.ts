const KEY_MINAPP_LIST = 'miniAppList';
const $XINYAOS = $(window['__XINYAOS_KEY__']);
const $XINYAOS_MINAPPS = $(`#${KEY_MINAPP_LIST}`).find(`.${KEY_MINAPP_LIST}`);
export {
  $XINYAOS,
  $XINYAOS_MINAPPS
}

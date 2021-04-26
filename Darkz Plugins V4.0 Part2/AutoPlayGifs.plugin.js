//META{"name":"autoGif"}*//
var autoGif=function(){};(function(){"use strict";const getInternalInstance=e=>e[Object.keys(e).find(k=>k.startsWith("__reactInternalInstance"))];function getOwnerInstance(e,{include,exclude=["Popout","Tooltip","Scroller","BackgroundFlash"]}={}){if(e===undefined){return undefined;}
const excluding=include===undefined;const filter=excluding?exclude:include;function getDisplayName(owner){const type=owner._currentElement.type;const constructor=owner._instance&&owner._instance.constructor;return type.displayName||constructor&&constructor.displayName||null;}
function classFilter(owner){const name=getDisplayName(owner);return(name!==null&&!!(filter.includes(name)^excluding));}
for(let prev,curr=getInternalInstance(e);!_.isNil(curr);prev=curr,curr=curr._hostParent){if(prev!==undefined&&!_.isNil(curr._renderedChildren)){let owner=Object.values(curr._renderedChildren).find(v=>!_.isNil(v._instance)&&v.getHostNode()===prev.getHostNode());if(!_.isNil(owner)&&classFilter(owner)){return owner._instance;}}
if(_.isNil(curr._currentElement)){continue;}
let owner=curr._currentElement._owner;if(!_.isNil(owner)&&classFilter(owner)){return owner._instance;}}
return null;}
function mutationFind(mutation,selector){var target=$(mutation.target),addedNodes=$(mutation.addedNodes);var mutated=target.add(addedNodes).filter(selector);var descendants=addedNodes.find(selector);var ancestors=target.parents(selector);return mutated.add(descendants).add(ancestors);}
function processAccessories(mutation){var accessories=mutationFind(mutation,".accessory");accessories.find(".image:has(canvas)").each(function(){var image=$(this);var canvas=image.children("canvas").first();var src=canvas.attr("src");if(src!==undefined){image.replaceWith($("<img>",{src:canvas.attr("src"),width:canvas.attr("width"),height:canvas.attr("height"),}).addClass("image kawaii-autogif"));}});accessories.find(".embed-thumbnail-gifv:has(video)").each(function(){var embed=$(this);var video=embed.children("video").first();embed.removeClass("embed-thumbnail-gifv").addClass("kawaii-autogif");embed.parent().on("mouseout.autoGif",function(event){event.stopPropagation();});video[0].play();});}
const animationForced=new WeakSet();function animateAvatar(){try{const messageGroup=getOwnerInstance(this,{include:["MessageGroup"]});if(messageGroup.state.animatedAvatar){animationForced.add(this);setTimeout(()=>messageGroup.setState({animate:true}));}}catch(err){return;}}
function processAvatars(mutation){mutationFind(mutation,".message-group").each(animateAvatar);}
autoGif.prototype.load=function(){};autoGif.prototype.unload=function(){};autoGif.prototype.start=function(){var mutation={target:document,addedNodes:[document]};processAccessories(mutation);processAvatars(mutation);$(".theme-dark, .theme-light").on("mouseleave.autoGif",".message-group",animateAvatar);};autoGif.prototype.stop=function(){$(".theme-dark, .theme-light").off(".autoGif",".message-group");$(".message-group").each(function(){if(!animationForced.delete(this)){return;}
try{getOwnerInstance(this,{include:["MessageGroup"]}).setState({animate:false});}catch(err){return;}});};autoGif.prototype.observer=function(mutation){processAccessories(mutation);processAvatars(mutation);};autoGif.prototype.getSettingsPanel=function(){return"";};autoGif.prototype.getName=function(){return"Autogif";};autoGif.prototype.getDescription=function(){return"Autoplay gifs without having to hover.";};autoGif.prototype.getVersion=function(){return"1.1.0";};autoGif.prototype.getAuthor=function(){return"noodlebox";};})();
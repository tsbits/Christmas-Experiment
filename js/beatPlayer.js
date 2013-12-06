/**
 * [beatPlayer description]
 * @param $audio A jQuery selector that return an audio tag
 */
var beatPlayer = function( $audio ){
	this.$audio = $audio;
}

/**
 * A function that play the sound.
 */
beatPlayer.prototype.play = function(){
	this.$audio.play();
}

/**
 * A function that pause the sound.
 */
beatPlayer.prototype.pause = function(){
	this.$audio.pause();
}

/**
 * Set or remove the loop attr on the audio tag according the the bool param.
 * @param mustloop A bool
 */
beatPlayer.prototype.loop = function( mustloop ){
	( mustLoop )?$( this.$audio ).attr( { 'loop': true } ):$( this.$audio ).removeAttr( 'loop' );
}

/**
 * A function that set the volume of the audio tag.
 * @param {[type]} volume
 */
beatPlayer.prototype.setVolume = function( volume ){
	this.$audio.volume = volume;
}